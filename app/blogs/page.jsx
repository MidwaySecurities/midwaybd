'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { BlogFilters } from '../components/blogFilter';
import BlogPagination from '../components/blogPagination';

const API_BASE_URL = process.env.PORTAL_URL || 'https://midway-wip.tanbinislam.com/api';
console.log('API_BASE_URL:', API_BASE_URL);
const BlogsInner = () => {
    const searchParams = useSearchParams();

    const tab = searchParams.get('tab');
    const category = searchParams.get('category');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');

    const activeCategory = category;
    const activeTab = tab || 'beginner';
    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(limit) || 5;

    const [blogs, setBlogs] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Guard against duplicate/looping fetches for the same params
    const lastKeyRef = useRef(null);

    useEffect(() => {
        const key = `${activeTab}|${activeCategory}|${currentPage}|${perPage}`;
        if (lastKeyRef.current === key) return;
        lastKeyRef.current = key;

        const controller = new AbortController();

        const fetchBlogs = async () => {
            setIsLoading(true);
            setError(null);

            const params = new URLSearchParams({
                tab: activeTab,
                page: String(currentPage),
                limit: String(perPage),
            });
            if (activeCategory) params.set('category', activeCategory);

            try {
                const res = await fetch(`${API_BASE_URL}/blogs?${params.toString()}`, {
                    signal: controller.signal,
                });

                if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);

                const json = await res.json();
                if (json?.status !== 'success' || !json?.blogs) {
                    throw new Error('Unexpected response from blogs API');
                }

                const blogsPayload = json.blogs;
                setBlogs(blogsPayload.data || []);
                setPagination({
                    currentPage: blogsPayload.current_page,
                    totalPages: blogsPayload.last_page,
                    total: blogsPayload.total,
                    perPage: blogsPayload.per_page,
                });
            } catch (err) {
                if (err.name === 'AbortError') return;
                console.error('Error fetching blogs from Midway API:', err);
                setError(err.message);
                setBlogs([]);
                setPagination({});
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();

        return () => controller.abort();
    }, [activeTab, activeCategory, currentPage, perPage]);

    return (
        <div className="px-4 sm:px-6 lg:px-12 py-10">
            {/* Header / Filters */}
            <BlogFilters
                activeTab={tab === 'latest' ? 'regular' : tab}
                activeCategory={category}
            />

            {/* Loading Skeleton */}
            {isLoading && (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: perPage }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col animate-pulse"
                        >
                            <div className="w-full h-52 bg-gray-200" />
                            <div className="p-5 flex flex-col flex-1 gap-3">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-200 rounded w-full" />
                                <div className="h-3 bg-gray-200 rounded w-5/6" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error State */}
            {!isLoading && error && (
                <div className="text-center text-red-500 my-20 text-lg">
                    Something went wrong while loading blogs. Please try again later.
                </div>
            )}

            {/* Blogs Grid */}
            {!isLoading && !error && blogs.length > 0 && (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                        >
                            {/* Cover Image */}
                            <Link href={`/blogs/${blog.slug}`}>
                                <img
                                    src={blog.cover_image}
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
            )}

            {/* Empty State */}
            {!isLoading && !error && blogs.length === 0 && (
                <div className="text-center text-gray-500 my-20 text-lg">No blogs found.</div>
            )}

            {/* Pagination */}
            {!isLoading && !error && blogs.length > 0 && (
                <div className="mt-10">
                    <BlogPagination
                        currentPage={pagination.currentPage || currentPage}
                        totalPages={pagination.totalPages}
                        activeTab={activeTab}
                        activeCategory={activeCategory}
                        perPage={perPage}
                    />
                </div>
            )}
        </div>
    )
}

const Blogs = () => (
    <Suspense
        fallback={
            <div className="px-4 sm:px-6 lg:px-12 py-10 text-center text-gray-500">
                Loading...
            </div>
        }
    >
        <BlogsInner />
    </Suspense>
);

export default Blogs