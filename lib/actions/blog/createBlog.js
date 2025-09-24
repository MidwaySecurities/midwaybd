'use server'

import Blog from "@/model/Blog";
import connectDB from "@/lib/db";
import fs from "fs";
import path from "path";

export const createBlog = async (formData) => {
  await connectDB();

  const title = formData.get('title');
  const slug = formData.get('slug')?.toLowerCase().replace(/\s+/g, '-') || '';
  const content = formData.get('content');
  const excerpt = formData.get('excerpt');
  const coverImage = formData.get('coverImage');
  const images = formData.getAll('images');
  const files = formData.getAll('file')
  const category = formData.get('category');
  const tags = formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim().toLowerCase()) : [];
  const relatedBlogs = formData.get('relatedBlogs') ? [formData.get('relatedBlogs')] : [];

  console.log("Creating blog with data:", { title, slug, content, excerpt, coverImage, images, category, tags, relatedBlogs });
  
  // Validate required fields
  if (!title || !slug || !content || !category) {
    return { error: "All fields are required." };
  }

  // Check if blog with the same slug exists
  const existingBlog = await Blog.findOne({ slug });
  if (existingBlog) {
    return { error: "Blog with this slug already exists." };
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  
  // Handle coverImage
  let coverImageUrl = '';
  if (coverImage && coverImage.size > 0) {
    const ext = coverImage.name.split('.').pop();
    const fileName = `cover-${slug}-${Date.now()}.${ext}`;
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await coverImage.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    coverImageUrl = `/uploads/${fileName}`;
  }

  // Handle additional images
  const imageUrls = [];
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    if (img && img.size > 0) {
      const ext = img.name.split('.').pop();
      const fileName = `img-${slug}-${Date.now()}-${i}.${ext}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await img.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      imageUrls.push(`/uploads/${fileName}`);
    }
  }

  // Create new blog document
  const newBlog = new Blog({
    title,
    slug,
    content,
    excerpt,
    coverImage: coverImageUrl,
    images: imageUrls,
    category,
    relatedBlogs,
    tags,
    // author: optional if you add author
  });

  await newBlog.save();

  return { success: true, blog: newBlog };
};
