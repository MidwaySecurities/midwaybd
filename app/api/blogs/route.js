// app/api/blogs/route.js
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getBlogs } from "@/lib/actions/blog/getBlogs";
import { createBlog } from "@/lib/actions/blog/createBlog";

// Disable Next.js body parsing for multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

/* ------------------------- GET: Fetch Blogs ------------------------- */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const tab = searchParams.get("tab") || "";
    const category = searchParams.get("category") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    console.log("Fetching blogs:", { tab, category, page, limit });

    const blogs = await getBlogs({ tag: tab, category, page, limit });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

/* ------------------------- POST: Create Blog ------------------------- */
export async function POST(req) {
  try {
    const formData = await req.formData();
    // Call your createBlog server function
    const result = await createBlog(formData);

    if (result?.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      blog: result.blog,
    });
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
