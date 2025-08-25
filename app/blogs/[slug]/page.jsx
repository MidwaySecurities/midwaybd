import { getABlog } from '@/lib/actions/blog/getABlog';
import React from 'react'

const BlogPage = async ({ params }) => {
    const { slug } = params;
    const blog = await getABlog(slug);
    console.log("blog", blog);
    return (
        <div className='max-w-screen-xl m-auto mt-4 p-4'>
            <h1 className='text-3xl font-bold mb-4'>{blog?.blog?.title}</h1>
            <img src={blog?.blog?.coverImage} alt={blog?.blog?.title} className='w-full h-auto object-cover mb-4' />
            <div className='text-gray-800' dangerouslySetInnerHTML={{ __html: blog?.blog?.content }}></div>
        </div>
    )
}

export default BlogPage;