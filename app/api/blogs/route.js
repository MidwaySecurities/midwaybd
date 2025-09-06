import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/actions/blog/getBlogs";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  console.log("Search params:", searchParams);
  const tab = searchParams.get("tab") || "";
  const category = searchParams.get("category") || "";

  console.log("Fetching blogs for:", tab, category);

  try {
    const blogs = await getBlogs({ tab, category });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
