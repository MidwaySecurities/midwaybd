'use server'

// get a single blog by slug
import Blog from "@/model/Blog";
const { default: connectDB } = require("@/lib/db");
export const getABlog = async (slug) => {

    await connectDB();
    try {
        const blog = await Blog.findOne({ slug }).populate("relatedBlogs");
        console.log(blog)
        if (!blog) {
            return { error: "Blog not found" };
        }
        return { blog };
    } catch (error) {   
        console.error("Error fetching blog:", error);
        return { error: "Error fetching blog" };
    }
}