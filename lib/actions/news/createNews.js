'use server'
import News from "@/model/News";

const { default: connectDB } = require("@/lib/db");
export const createNews = async (formData) => {
    await connectDB();
    const title = formData.title;
    const slug = formData.slug;
    const content = formData.content;
    const excerpt = formData.excerpt;
    const coverImage = formData.coverImage;
    const category = formData.category;
    const tags = ['tag1']
    // const author = formData.author;
    console.log("Creating news with data:", { title, slug, content, excerpt, coverImage, category });

    if (!title || !slug || !content || !category) {
        return { error: "All fields are required." };
    }

    const existingNews = await News.findOne({ slug });

    if (existingNews) {
        return { error: "News with this slug already exists." };
    }

    let coverImageUrl = '';
    if (coverImage && coverImage.size > 0) {
        const uploadDir = 'public/uploads/';
        const fileExtension = coverImage.name.split('.').pop();
        // const fileName = `${Date.now()}.${fileExtension}`;
        const fileName = `${slug.split(' ').join('-').toLowerCase()}.${fileExtension}`;
        const filePath = `${uploadDir}${fileName}`;
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        // Save the file to the server
        const buffer = Buffer.from(await coverImage.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        coverImageUrl = `/uploads/${fileName}`;
    } else {
        coverImageUrl = ''; // or set a default image URL if needed
    }
    const newNews = new News({
        title,
        slug,
        content,
        excerpt,
        thumbnail: coverImageUrl,
        category,
        // author,
    });
    try {
        await newNews.save();
        return { message: "News created successfully.", news: newNews };
    } catch (error) {
        console.error("Error creating news:", error);
        return { error: "Failed to create news." };
    }
}