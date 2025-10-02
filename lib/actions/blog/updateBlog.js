import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import connectDB from "@/lib/db";
import Blog from "@/model/Blog";

export async function updateBlog(id, formData) {
  await connectDB();

  const currentSavedImages = formData.get('currentSavedImages').length>0?formData.get('currentSavedImages').split(','):[]

  try {
    const blog = await Blog.findById(id);
    if (!blog) return { error: "Blog not found" };
    const previousImages = blog.get('images')
    const setOfcurrentSavedImages = new Set(currentSavedImages)
    for (const item of previousImages) {
      if (!setOfcurrentSavedImages.has(item)) {
        const filePath = path.join(process.cwd(), 'public', item)
        try {
          await fs.access(filePath)
          await fs.unlink(filePath)
        }catch(err){
          // ignore 
        }
      }
    }
    // Fields
    const slug = formData.get("slug") || blog.slug;
    blog.title = formData.get("title") || blog.title;
    blog.slug = slug;
    blog.excerpt = formData.get("excerpt") || blog.excerpt;
    blog.category = formData.get("category") || blog.category;
    blog.tags = formData.get("tags")
      ? formData.get("tags").split(",").map((t) => t.trim())
      : blog.tags;

    // ==============================
    // Handle Content + Editor Images
    // ==============================
    let newContent = formData.get("content") || blog.content;

    // Extract image sources
    const extractImgSrcs = (html) => {
      const matches = html.match(/<img[^>]+src="([^">]+)"/g) || [];
      return matches.map((m) => m.match(/src="([^">]+)"/)[1]);
    };

    const oldImages = extractImgSrcs(blog.content || "");
    let newImages = extractImgSrcs(newContent);
    // Delete images removed from editor
    const removedImages = oldImages.filter((img) => !newImages.includes(img));
    for (const imgPath of removedImages) {
      if (imgPath.startsWith("/uploads/")) {
        try {
          const filePath = path.join(process.cwd(), "public", imgPath);
          await fs.unlink(filePath);
        } catch (err) {
          console.warn("Failed to delete unused image:", imgPath, err.message);
        }
      }
    }

    // Save uploaded inline images (base64 → file)
    const base64Regex = /^data:image\/(png|jpg|jpeg|gif);base64,/;
    const updatedImgMap = {};

    for (const src of newImages) {
      if (base64Regex.test(src)) {
        const ext = src.match(/^data:image\/(png|jpg|jpeg|gif);/)[1];
        const fileName = `${slug}-${uuidv4()}.${ext}`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName);

        const base64Data = src.replace(base64Regex, "");
        const buffer = Buffer.from(base64Data, "base64");
        await fs.writeFile(filePath, buffer);

        const newUrl = `/uploads/${fileName}`;
        updatedImgMap[src] = newUrl;
      }
    }

    // Replace base64 src with real uploaded paths
    Object.entries(updatedImgMap).forEach(([oldSrc, newSrc]) => {
      newContent = newContent.replaceAll(oldSrc, newSrc);
    });

    blog.content = newContent;

    // ==============================
    // Cover image
    // ==============================
    const coverImageFile = formData.get("coverImage");
    if (coverImageFile && coverImageFile.name) {
      const ext = path.extname(coverImageFile.name);
      const fileName = `${slug}-cover${ext}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      const buffer = Buffer.from(await coverImageFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      blog.coverImage = `/uploads/${fileName}`;
    }

    // ==============================
    // Additional images
    // ==============================
    const images = formData.getAll("images");
    if (images && images.length > 0) {
      const newImgs = [];
      for (const img of images) {
        if (img && img.name) {
          const ext = path.extname(img.name);
          const fileName = `${slug}-${uuidv4()}${ext}`;
          const filePath = path.join(process.cwd(), "public/uploads", fileName);

          const buffer = Buffer.from(await img.arrayBuffer());
          await fs.writeFile(filePath, buffer);

          newImgs.push(`/uploads/${fileName}`);
        }
      }
      blog.images = [...currentSavedImages, ...newImgs];
    }else {
      blog.images = [...currentSavedImages]
    }
    const updatedBlog = await blog.save();
    return { success: true, blog: updatedBlog };
  } catch (err) {
    console.error("Error updating blog:", err);
    return { error: err.message };
  }
}
