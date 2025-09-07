import Link from 'next/link'
import Tabs from '../components/blogTab'
import BlogCategoryDropDown from '../components/blogCategoryDropDown'

const Blogs = async ({ searchParams }) => {
    const { tab, category } = await searchParams || 'latest'
    const activeCity = tab?.toLowerCase() || 'beginner'
    const activeCategory = category || 'Select Category'
    
    const blogs = await fetch(`http://localhost:3000/api/blogs?tab=${activeCity}&category=${activeCategory}`, {
        next: { revalidate: 60 },
    }).then((res) => res.json())

    return (
        <div>
            <div className="m-4">
                <div className="flex justify-start items-center border-2 border-[#ccc] rounded-t-lg">
                    <Tabs activeCity={activeCity === 'latest' ? 'regular' : activeCity} />
                    <BlogCategoryDropDown activeCategory={activeCategory} />
                </div>
            </div>

            {blogs?.blogs?.length > 0 ? (
                blogs.blogs.map((blog) => (
                    <div key={blog._id} className="border p-4 m-4 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-auto object-cover mb-4"
                        />
                        <div className="text-gray-800">{blog.excerpt}</div>
                        <Link
                            href={`/blogs/${blog.slug}`}
                            className="text-blue-500 hover:underline mt-4 inline-block"
                        >
                            Read More
                        </Link>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 my-20">No blogs found.</div>
            )}
        </div>
    )
}

export default Blogs


