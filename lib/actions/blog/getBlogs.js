'use server'

import Blog from "@/model/Blog";

const { default: connectDB } = require("@/lib/db");


export const getBlogs = async (findParams) => {
    const tags = findParams?.tag;
    console.log("Tags in getBlogs:", tags);
    await connectDB();

    try {
        // const blogs = await Blog.find({tags}).sort({ createdAt: -1 });
        // find blogs by tags if any tag is provided otherwise find all blogs
        let blogs;
        if (tags) {
            blogs = await Blog.find({ tags: { $in: [tags] } }).sort({ createdAt: -1 });
        } else {
            blogs = await Blog.find().sort({ createdAt: -1 });
        }
        return { blogs };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { error: "Failed to fetch blogs." };
    }
}