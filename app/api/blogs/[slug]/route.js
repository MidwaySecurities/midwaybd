// app/api/blogs/[id]/route.js
import { getABlog } from '@/lib/actions/blog/getABlog';
import { updateBlog } from '@/lib/actions/blog/updateBlog';
import { NextResponse } from 'next/server';

export async function GET(req, {params}){
    const slug = await params.slug
    try {
        const {blog} = await getABlog(slug)
        return NextResponse.json({
            blog
        })
    }catch(err){
        console.log(err)
    }
}

export async function PUT(req, { params }) {
  console.log('hello world')
  try {
    const formData = await req.formData();
    const result = await updateBlog(params.slug, formData);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true, blog: result.blog });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
