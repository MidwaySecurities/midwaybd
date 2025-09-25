import { getBlogs } from '@/lib/actions/blog/getBlogs'
import Link from 'next/link';
import React from 'react'
import Tabs from '../components/blogTab';
import BlogCategoryDropDown from '../components/blogCategoryDropDown';
import BlogPagination from '../components/blogPagination';
import { BlogFilters } from '../components/blogFilter';

const Blogs = async ({ searchParams }) => {
    const { tab, category, page, limit } = await searchParams;
    console.log(category)
    const activeCategory = category;
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
        <div className="px-4 sm:px-6 lg:px-12 py-10">
            {/* ✅ Header */}
            <BlogFilters
                activeTab={tab === 'latest' ? 'regular' : tab}
                activeCategory={category}
            />

            {/* ✅ Blogs Grid */}
            {blogs.length > 0 ? (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                        >
                            {/* Cover Image */}
                            <Link href={`/blogs/${blog.slug}`}>
                                <img
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </Link>

                            {/* Blog Content */}
                            <div className="p-5 flex flex-col flex-1">
                                <Link href={`/blogs/${blog.slug}`}>
                                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                                        {blog.title}
                                    </h2>
                                </Link>
                                <p className="text-sm text-gray-600 mt-3 line-clamp-3 flex-1">
                                    {blog.excerpt}
                                </p>
                                <Link
                                    href={`/blogs/${blog.slug}`}
                                    className="text-blue-500 hover:text-blue-600 font-medium mt-4 inline-block"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 my-20 text-lg">No blogs found.</div>
            )}

            {/* ✅ Pagination */}
            <div className="mt-10">
                <BlogPagination
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    activeTab={activeTab}
                    activeCategory={activeCategory}
                    perPage={perPage}
                />
            </div>
        </div>
    )
}

export default Blogs
