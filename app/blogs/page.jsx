import { getBlogs } from '@/lib/actions/blog/getBlogs'
import Link from 'next/link';
import React from 'react'

const Blogs = async () => {

    const blogs = await getBlogs();
    console.log(blogs);

    return (
        <div>
            {blogs?.blogs?.map((blog) => {
                return (
                    <div key={blog._id} className='border p-4 m-4 rounded-lg shadow-lg'>
                        <h2 className='text-2xl font-bold mb-2'>{blog.title}</h2>
                        <img src={blog.coverImage} alt={blog.title} className='w-full h-auto object-cover mb-4' />
                        <div className='text-gray-800'>{blog.excerpt}</div>
                        <Link href={`/blogs/${blog.slug}`} className='text-blue-500 hover:underline mt-4 inline-block'>Read More</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Blogs