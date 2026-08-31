import BlogPost from '@/app/components/blogShare';
import Carousel from '@/app/components/carousel';
import Link from 'next/link';
import React from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'https://portal.midwaybd.com/api';

async function getABlog(slug, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

      const res = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
        next: { revalidate: 60 },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (res.status === 404) {
        return null; // genuine "not found" — don't retry
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch blog: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();

      if (json?.status !== 'success' || !json?.blog) {
        return null;
      }

      return json.blog;
    } catch (error) {
      console.error(`Error fetching blog (attempt ${attempt + 1}/${retries + 1}):`, error);
      if (attempt === retries) {
        return null;
      }
      await new Promise((r) => setTimeout(r, 300 * (attempt + 1))); // small backoff
    }
  }
}

const BlogPage = async ({ params }) => {
  const { slug } = await params;
  const blog = await getABlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h1>
          <Link href="/blogs" className="text-secondary_color hover:underline">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  const wordCount = blog?.content?.replace(/<[^>]*>/g, '').split(' ').length || 0;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative">
        <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
          {blog?.images?.length > 0 ? (
            <Carousel images={blog.images} />
          ) : (
            <div className="relative mt-1 w-full flex justify-center items-center">
              <img
                src={blog?.cover_image}
                alt={blog?.title}
                className="w-[80%] object-cover"
              />
              <div className="absolute inset-0 bg-transparent bg-opacity-30"></div>
            </div>
          )}
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent text-white p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-blue-600 text-white text-xs md:text-sm rounded-full px-4 py-2 mb-4">
              <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {blog?.category}
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {blog?.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Blog Meta Info */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-4 text-[12px] md:text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Published on {blog?.created_at ? new Date(blog.created_at).toLocaleDateString() : '—'}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readMinutes} min read
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Share:</span>
              <BlogPost
                postUrl={`${API_BASE_URL}/blogs/${blog?.slug}`}
                postTitle={blog?.title}
              />
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <article className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-200 mb-8 overflow-x-hidden">
          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed
                     prose-headings:text-gray-900 prose-headings:font-bold
                     prose-p:text-gray-700 prose-p:leading-relaxed
                     prose-a:text-secondary_color prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-gray-900 prose-strong:font-semibold
                     prose-ul:text-gray-700 prose-ol:text-gray-700
                     prose-li:text-gray-700 prose-li:leading-relaxed
                     prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                     prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6
                     prose-blockquote:text-gray-700 prose-blockquote:not-italic
                     prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                     prose-pre:bg-gray-900 prose-pre:text-gray-100
                     prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          ></div>
        </article>

        {/* Author/Tags Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Midway Securities</h3>
                <p className="text-gray-600 text-sm">Investment Research Team</p>
              </div>
            </div>

            {blog?.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Blogs Section */}
      {blog?.related_blogs && blog.related_blogs.length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Related Articles
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover more insights and analysis from our investment research team
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blog.related_blogs.map((relatedBlog) => (
                <article
                  key={relatedBlog.id}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <Link href={`/blogs/${relatedBlog.slug}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedBlog.cover_image_url}
                        alt={relatedBlog.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>
                  </Link>

                  <div className="p-6">
                    <Link href={`/blogs/${relatedBlog.slug}`}>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-secondary_color transition-colors">
                        {relatedBlog.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {relatedBlog.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {relatedBlog.created_at ? new Date(relatedBlog.created_at).toLocaleDateString() : ''}
                      </span>
                      <Link
                        href={`/blogs/${relatedBlog.slug}`}
                        className="inline-flex items-center text-secondary_color font-medium hover:text-blue-700 transition-colors group"
                      >
                        Read More
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href="/blogs"
              className="inline-flex items-center text-secondary_color hover:text-blue-700 font-medium transition-colors group"
            >
              <svg className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to all blogs
            </Link>

            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Stay Updated</h3>
              <p className="text-gray-600 text-sm">Get the latest market insights delivered to your inbox</p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition-colors">
              Open BO Account Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;