import { getABlog } from '@/lib/actions/blog/getABlog';
import Link from 'next/link';
import React from 'react'

const BlogPage = async ({ params }) => {
    const { slug } = params;
    const blog = await getABlog(slug);
    console.log(blog)
    return (
        <div className='m-auto mt-4 p-4'>
            <h1 className='text-2xl font-bold mb-4'>{blog?.blog?.title}</h1>
            <img src={blog?.blog?.coverImage} alt={blog?.blog?.title} className='w-full h-auto object-cover mb-4' />
            <div className='text-gray-800 w-full overflow-x-hidden' dangerouslySetInnerHTML={{ __html: blog?.blog?.content }}></div>

            {/* return to all blogs page */}
            {/* related blog */}
            <h1 className='text-2xl font-bold mt-8'>Related Blog</h1>
            {blog?.blog?.relatedBlogs && blog?.blog?.relatedBlogs.length > 0 ? (
                blog?.blog?.relatedBlogs.map((relatedBlog) => (
                    <div key={relatedBlog._id} className='border p-4 m-4 rounded-lg shadow-lg'>
                        <h2 className='text-2xl font-bold mb-2'>{relatedBlog.title}</h2>
                        <img src={relatedBlog.coverImage} alt={relatedBlog.title} className='w-full h-auto object-cover mb-4' />
                        <div className='text-gray-800'>{relatedBlog.excerpt}</div>
                        <Link href={`/blogs/${relatedBlog.slug}`} className='text-blue-500 hover:underline mt-4 inline-block'>Read More</Link>
                    </div>
                ))
            ) : (
                <p>No related blogs found.</p>
            )}




            <div className='mt-8'>
                <Link href="/blogs" className='text-blue-500 hover:underline'>← Back to all blogs</Link>
            </div>
        </div>
    )
}

export default BlogPage;