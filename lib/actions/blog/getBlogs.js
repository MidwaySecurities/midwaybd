'use server'

import Blog from "@/model/Blog";

const { default: connectDB } = require("@/lib/db");


export const getBlogs = async () => {

    await connectDB();

    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return { blogs };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { error: "Failed to fetch blogs." };
    }
}