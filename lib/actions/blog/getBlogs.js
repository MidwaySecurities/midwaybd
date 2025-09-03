'use server'

import Blog from "@/model/Blog";

const { default: connectDB } = require("@/lib/db");


export const getBlogs = async (findParams) => {
    const tags = findParams?.tag;
    const activeCategory = findParams?.category;
    console.log("Tags in getBlogs:", tags);
    console.log("Category", activeCategory);
    await connectDB();

    try {
        const query = {};
        if (tags) {
            query.tags = tags;
        }
        if (activeCategory) {
            query.category = activeCategory === 'Select Category' ? { $ne: null } : activeCategory;
        }
        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        return { blogs };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { error: "Failed to fetch blogs." };
    }
}