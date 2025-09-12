import { getBlogs } from '@/lib/actions/blog/getBlogs'
import Link from 'next/link';
import React from 'react'
import Tabs from '../components/blogTab';
import BlogCategoryDropDown from '../components/blogCategoryDropDown';
import BlogPagination from '../components/blogPagination';

const Blogs = async ({ searchParams }) => {
    const { tab, category, page, limit } = await searchParams;

    const activeCategory = category || 'Select Category';
    const activeTab = tab || 'beginner';
    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(limit) || 2; // default 5 blogs per page

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const data = await fetch(
        `${baseUrl}/api/blogs?tab=${activeTab}&category=${activeCategory}&page=${currentPage}&limit=${perPage}`,
        { next: { revalidate: 60 } }
    ).then(res => res.json());

    const blogs = data?.blogs || [];
    const pagination = data?.pagination || {};

    return (
        <div>
            <div className='m-4'>
                <div className='flex justify-start items-center border-2 border-[#ccc] rounded-t-lg'>
                    <Tabs activeTab={tab === 'latest' ? 'regular' : tab} />
                    <BlogCategoryDropDown activeCategory={category} />
                </div>
            </div>

            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div key={blog._id} className='border p-4 m-4 rounded-lg shadow-lg'>
                        <Link href={`/blogs/${blog.slug}`}>
                            <h2 className='text-2xl font-bold mb-2'>{blog.title}</h2>
                        </Link>
                        <img src={blog.coverImage} alt={blog.title} className='w-full h-auto object-cover mb-4' />
                        <div className='text-gray-800'>{blog.excerpt}</div>
                        <Link href={`/blogs/${blog.slug}`} className='text-blue-500 hover:underline mt-4 inline-block'>
                            Read More
                        </Link>
                    </div>
                ))
            ) : (
                <div className='text-center text-gray-500 my-20'>No blogs found.</div>
            )}
            <BlogPagination currentPage={currentPage} totalPages={pagination.totalPages} activeTab={activeTab} activeCategory={activeCategory} perPage={perPage} />
        </div>
    )
}

export default Blogs

