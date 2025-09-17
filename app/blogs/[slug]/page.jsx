import BlogPost from '@/app/components/blogShare';
import Carousel from '@/app/components/carousel';
import { getABlog } from '@/lib/actions/blog/getABlog';
import Link from 'next/link';
import React from 'react'

const BlogPage = async ({ params }) => {
    const { slug } = params;
    const blog = await getABlog(slug);
    return (
        <div className='m-auto mt-4 p-4'>
            <div className='my-2 mb-12'>
                {blog?.blog.images.length > 0 && (
                    <Carousel images={blog?.blog.images} />
                )}
            </div>

            <h1 className='text-xl font-bold mb-1'>{blog?.blog?.title}</h1>
            <button className='bg-qtp_btn_bg_color text-white text-[.7rem] rounded-lg p-1 px-2 mb-4'>{blog?.blog?.category}</button>
            {blog?.blog.images.length === 0 && (
                <img src={blog?.blog?.coverImage} alt={blog?.blog?.title} className='w-full h-auto object-cover mb-4' />
            )}
            <div className='text-gray-800 w-full overflow-x-hidden' dangerouslySetInnerHTML={{ __html: blog?.blog?.content }}></div>
            <BlogPost postUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blog?.blog?.slug}`} postTitle={blog?.blog?.title} />
            {/* return to all blogs page */}
            {/* related blog */}
            <h1 className='text-2xl font-bold mt-8'>Related Blog</h1>
            
            {blog?.blog?.relatedBlogs && blog?.blog?.relatedBlogs.length > 0 ? (
                blog?.blog?.relatedBlogs.map((relatedBlog) => (
                    <div key={relatedBlog._id} className='border p-4 m-4 rounded-lg shadow-lg'>
                        <Link href={`/blogs/${relatedBlog.slug}`}>
                            <h1 className='text-xl font-bold mb-2'>{relatedBlog.title}</h1>
                        </Link>
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