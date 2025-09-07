// import Link from 'next/link';
// import React from 'react'
// import Tabs from '../components/blogTab';
// import BlogCategoryDropDown from '../components/blogCategoryDropDown';

// const Blogs = async ({ searchParams }) => {
//     const {tab, category} = await searchParams
//     const activeCategory = category || 'Select Category';
//     const activeTab = tab || 'beginner';
//     const blogs = await fetch(`http://localhost:3000/api/blogs?tab=${activeTab}&category=${activeCategory}`, {
//         next: {
//             revalidate: 60
//         }
//     }).then(res => res.json());
//     return (
//         <div>
//             <div className='m-4'>
//                 <div className='flex justify-start items-center border-2 border-[#ccc] rounded-t-lg'>
//                     <Tabs activeTab={tab === 'latest' ? 'regular' : tab} />
//                     <BlogCategoryDropDown activeCategory={category} />
//                 </div>
//             </div>
//             <div className='m-4'>
//             </div>
//             {blogs?.blogs?.length>0?blogs?.blogs?.map((blog) => {
//                 return (
//                     <div key={blog._id} className='border p-4 m-4 rounded-lg shadow-lg'>

//                         <Link href={`/blogs/${blog.slug}`}>
//                             <h2 className='text-2xl font-bold mb-2'>{blog.title}</h2>
//                         </Link>
//                         <img src={blog.coverImage} alt={blog.title} className='w-full h-auto object-cover mb-4' />
//                         <div className='text-gray-800'>{blog.excerpt}</div>
//                         <Link href={`/blogs/${blog.slug}`} className='text-blue-500 hover:underline mt-4 inline-block'>Read More</Link>
//                     </div>
//                 )
//             }):(
//                 <div className='text-center text-gray-500 my-20'>No blogs found.</div>
//             )}
//         </div>
//     )
// }

// export default Blogs


// import { getBlogs } from '@/lib/actions/blog/getBlogs'
// import Link from 'next/link';
// import React from 'react'
// import Tabs from '../components/blogTab';
// import BlogCategoryDropDown from '../components/blogCategoryDropDown';

// const Blogs = async ({ searchParams }) => {
//     const { tab, category, page, limit } = searchParams;

//     const activeCategory = category || 'Select Category';
//     const activeTab = tab || 'beginner';
//     const currentPage = parseInt(page) || 1;
//     const perPage = parseInt(limit) || 5; // default 5 blogs per page

//     const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

//     const data = await fetch(
//         `${baseUrl}/api/blogs?tab=${activeTab}&category=${activeCategory}&page=${currentPage}&limit=${perPage}`,
//         { next: { revalidate: 60 } }
//     ).then(res => res.json());

//     const blogs = data?.blogs || [];
//     const pagination = data?.pagination || {};

//     return (
//         <div>
//             {/* Top Filters */}
//             <div className='m-4'>
//                 <div className='flex justify-start items-center border-2 border-[#ccc] rounded-t-lg'>
//                     <Tabs activeTab={tab === 'latest' ? 'regular' : tab} />
//                     <BlogCategoryDropDown activeCategory={category} />
//                 </div>
//             </div>

//             {/* Blog List */}
//             {blogs.length > 0 ? (
//                 blogs.map((blog) => (
//                     <div key={blog._id} className='border p-4 m-4 rounded-lg shadow-lg'>
//                         <Link href={`/blogs/${blog.slug}`}>
//                             <h2 className='text-2xl font-bold mb-2'>{blog.title}</h2>
//                         </Link>
//                         <img src={blog.coverImage} alt={blog.title} className='w-full h-auto object-cover mb-4' />
//                         <div className='text-gray-800'>{blog.excerpt}</div>
//                         <Link href={`/blogs/${blog.slug}`} className='text-blue-500 hover:underline mt-4 inline-block'>
//                             Read More
//                         </Link>
//                     </div>
//                 ))
//             ) : (
//                 <div className='text-center text-gray-500 my-20'>No blogs found.</div>
//             )}

//             {/* Pagination Controls */}
//             {pagination.totalPages > 1 && (
//                 <div className="flex justify-center gap-4 my-6">
//                     {currentPage > 1 && (
//                         <Link
//                             href={`/blogs?tab=${activeTab}&category=${activeCategory}&page=${currentPage - 1}&limit=${perPage}`}
//                             className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
//                         >
//                             Previous
//                         </Link>
//                     )}
//                     <span className="px-4 py-2">Page {currentPage} of {pagination.totalPages}</span>
//                     {currentPage < pagination.totalPages && (
//                         <Link
//                             href={`/blogs?tab=${activeTab}&category=${activeCategory}&page=${currentPage + 1}&limit=${perPage}`}
//                             className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
//                         >
//                             Next
//                         </Link>
//                     )}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Blogs


import { getBlogs } from '@/lib/actions/blog/getBlogs'
import Link from 'next/link';
import React from 'react'
import Tabs from '../components/blogTab';
import BlogCategoryDropDown from '../components/blogCategoryDropDown';

const Blogs = async ({ searchParams }) => {
    const { tab, category, page, limit } = searchParams;

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
            {/* Top Filters */}
            <div className='m-4'>
                <div className='flex justify-start items-center border-2 border-[#ccc] rounded-t-lg'>
                    <Tabs activeTab={tab === 'latest' ? 'regular' : tab} />
                    <BlogCategoryDropDown activeCategory={category} />
                </div>
            </div>

            {/* Blog List */}
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

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center gap-4 my-6">
                    {currentPage > 1 && (
                        <Link
                            href={`/blogs?tab=${activeTab}&category=${activeCategory}&page=${currentPage - 1}&limit=${perPage}`}
                            className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
                        >
                            Previous
                        </Link>
                    )}
                    <span className="px-4 py-2">Page {currentPage} of {pagination.totalPages}</span>
                    {currentPage < pagination.totalPages && (
                        <Link
                            href={`/blogs?tab=${activeTab}&category=${activeCategory}&page=${currentPage + 1}&limit=${perPage}`}
                            className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
                        >
                            Next
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}

export default Blogs

