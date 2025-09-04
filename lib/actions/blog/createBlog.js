'use server'

import Blog from "@/model/Blog";

const { default: connectDB } = require("@/lib/db");


export const createBlog = async (formData) => {

    await connectDB();

    // Extract values from FormData
    const title = formData.get('title');
    const slug = formData.get('slug');
    const content = formData.get('content');
    const excerpt = formData.get('excerpt');
    const coverImage = formData.get('coverImage');
    const category = formData.get('category');
    const tags = formData.get('tags') ? formData.get('tags').split(',') : [];
    const author = formData.get('author');
    const relatedBlogs = formData.get('relatedBlogs') ? [formData.get('relatedBlogs')] : [];
    console.log("Creating blog with data:", { title, slug, content, excerpt, coverImage, category, tags, author, relatedBlogs });

    // Validate required fields
    if (!title || !slug || !content || !category) {
        return { error: "All fields are required." };
    }

    // Check if blog with the same slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
        return { error: "Blog with this slug already exists." };
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
    


    // Create new blog
    // const newBlog = new Blog({
    //     title,
    //     slug,
    //     content,
    //     excerpt,
    //     coverImage,
    //     category,
    //     tags,
    //     author
    // });
    const newBlog = new Blog({
        title,
        slug:slug.split(' ').join('-').toLowerCase(),
        content,
        excerpt,
        coverImage: coverImageUrl,
        category,
        relatedBlogs,
        tags,
        // author
    });

    // Save blog to database
    await newBlog.save();

    return { success: true };
}
