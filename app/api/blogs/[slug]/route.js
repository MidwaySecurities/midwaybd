// app/api/blogs/[id]/route.js
import fs from 'fs/promises';
import path from 'path';
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
    const {slug} = await params
    const blog = await Blog.findById(slug);
    const blogCoverImage = blog.coverImage;
    const blogImages = blog.images;
    const blogContentImages = blog.content
    const extractImgSrcs = (html) => {
      const matches = html.match(/<img[^>]+src="([^">]+)"/g) || [];
      return matches.map((m) => m.match(/src="([^">]+)"/)[1]);
    };
    const allImages = [blogCoverImage, ...blogImages, ...extractImgSrcs(blogContentImages)];
    console.log(allImages, allImages.length);

    allImages.forEach((imgPath) => {
      fs.unlink(path.join(process.cwd(), 'public', imgPath), (err) => {
        if (err) console.error(`Error deleting image: ${err.message}`);
        else console.log(`Deleted image: ${imgPath}`);
      });
    });
    await Blog.findByIdAndDelete(slug);
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
