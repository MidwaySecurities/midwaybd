// app/api/blogs/[id]/route.js
import { getABlog } from '@/lib/actions/blog/getABlog';
import { updateBlog } from '@/lib/actions/blog/updateBlog';
import Blog from '@/model/Blog';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const slug = await params.slug
  try {
    const { blog } = await getABlog(slug)
    return NextResponse.json({
      blog
    })
  } catch (err) {
    console.log(err)
  }
}

export async function PUT(req, { params }) {
  try {
    const formData = await req.formData();
    console.log(formData.get('images'))
    const result = await updateBlog(params.slug, formData);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true, blog: result.blog });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const slug = await params.slug
    const blog = await Blog.findOne({ slug: slug }).select('blogCoverImage -_id');
    const blogCoverImage = blog.coverImage;
    const blogImages = blog.images;
    const blogContentImages = blog.content
    const extractImgSrcs = (html) => {
      const matches = html.match(/<img[^>]+src="([^">]+)"/g) || [];
      return matches.map((m) => m.match(/src="([^">]+)"/)[1]);
    };
    extractImgSrcs(blog.content)
    console.log(extractImgSrcs(blogContentImages))
    await Blog.deleteOne({ slug: slug });
    return NextResponse.json({ message: `Blog with slug ${params.slug} deleted successfully` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
