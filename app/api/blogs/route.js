import { getBlogs } from "@/lib/actions/blog/getBlogs";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const tab = searchParams.get('tab') || 'latest';
  const category = searchParams.get('category') || 'Select Category';
  // get blogs from database
  const blogs = await getBlogs({ tag: tab, category });
  return Response.json(blogs)
}