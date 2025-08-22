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

    console.log("Creating blog with data:", { title, slug, content, excerpt, coverImage, category, tags, author });

    // Validate required fields
    if (!title || !slug || !content || !category) {
        return { error: "All fields are required." };
    }

    // Check if blog with the same slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
        return { error: "Blog with this slug already exists." };
    }

    // Create new blog
    const newBlog = new Blog({
        title,
        slug,
        content,
        excerpt,
        coverImage,
        category,
        tags,
        author
    });

    // Save blog to database
    await newBlog.save();

    return { success: true };
}
