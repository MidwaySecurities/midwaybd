import { getBlogs } from "@/lib/actions/blog/getBlogs";

export async function GET() {
// get blogs from database
  const blogs = await getBlogs();
  return Response.json(blogs)
}