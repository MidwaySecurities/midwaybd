import { getBlogs } from '@/lib/actions/blog/getBlogs'
import Link from 'next/link';
import React from 'react'
import Tabs from '../components/blogTab';
import BlogCategoryDropDown from '../components/blogCategoryDropDown';

const Blogs = async ({ searchParams }) => {
    const activeCity = searchParams.tab?.toLowerCase() || "beginner";
    const activeCategory = searchParams.category || "Others";
    console.log(activeCity, activeCategory)

    // const blogs = await getBlogs({ tag: activeCity, category: activeCategory });
    const blogs = await fetch(`https://midwaybd.vercel.app//api/blogs`, {
        next: {
            revalidate: 60
        }
    }).then(res => res.json());
    console.log('haha', blogs)
    return (
        <div>
            <div className='m-4'>
                <div className='flex justify-start items-center border-2 border-[#ccc] rounded-t-lg'>
                    <Tabs activeCity={activeCity === 'latest' ? 'regular' : activeCity} />
                    <BlogCategoryDropDown activeCategory={activeCategory} />
                </div>
            </div>
            <div className='m-4'>
            </div>
            {blogs?.blogs?.length>0?blogs?.blogs?.map((blog) => {
                return (
                    <div key={blog._id} className='border p-4 m-4 rounded-lg shadow-lg'>

                        <h2 className='text-2xl font-bold mb-2'>{blog.title}</h2>
                        <img src={blog.coverImage} alt={blog.title} className='w-full h-auto object-cover mb-4' />
                        <div className='text-gray-800'>{blog.excerpt}</div>
                        <Link href={`/blogs/${blog.slug}`} className='text-blue-500 hover:underline mt-4 inline-block'>Read More</Link>
                    </div>
                )
            }):(
                <div className='text-center text-gray-500 my-20'>No blogs found.</div>
            )}
        </div>
    )
}

export default Blogs

// import Link from 'next/link'
// import Tabs from '../components/blogTab'
// import BlogCategoryDropDown from '../components/blogCategoryDropDown'

// const Blogs = async ({ searchParams }) => {
//   const activeCity = searchParams?.tab?.toLowerCase() || 'beginner'
//   const activeCategory = searchParams?.category || 'Others'

//   // ✅ Use absolute URL in production or call API logic directly
//   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://midwaybd.vercel.app/'
//   const blogs = await fetch(`${baseUrl}/api/blogs?tab=${activeCity}&category=${activeCategory}`, {
//     next: { revalidate: 60 },
//   }).then((res) => res.json())

//   return (
//     <div>
//       <div className="m-4">
//         <div className="flex justify-start items-center border-2 border-[#ccc] rounded-t-lg">
//           <Tabs activeCity={activeCity === 'latest' ? 'regular' : activeCity} />
//           <BlogCategoryDropDown activeCategory={activeCategory} />
//         </div>
//       </div>

//       {blogs?.blogs?.length > 0 ? (
//         blogs.blogs.map((blog) => (
//           <div key={blog._id} className="border p-4 m-4 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
//             <img
//               src={blog.coverImage}
//               alt={blog.title}
//               className="w-full h-auto object-cover mb-4"
//             />
//             <div className="text-gray-800">{blog.excerpt}</div>
//             <Link
//               href={`/blogs/${blog.slug}`}
//               className="text-blue-500 hover:underline mt-4 inline-block"
//             >
//               Read More
//             </Link>
//           </div>
//         ))
//       ) : (
//         <div className="text-center text-gray-500 my-20">No blogs found.</div>
//       )}
//     </div>
//   )
// }

// export default Blogs

