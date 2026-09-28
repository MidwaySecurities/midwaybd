import React from 'react';

const BlogLoader = () => {
  return (
    <div>
      {/* Tabs and Category Dropdown Skeleton */}
      <div className='m-4'>
        <div className='flex justify-start items-center border-2 border-[#ccc] rounded-t-lg'>
          {/* Tabs Skeleton */}
          <div className="flex">
            <div className="h-12 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-tl-lg"></div>
            <div className="h-12 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-12 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" style={{ animationDelay: '0.2s' }}></div>
          </div>
          {/* Category Dropdown Skeleton */}
          <div className="h-12 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] ml-auto rounded-tr-lg" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>

      <div className='m-4'></div>

      {/* Blog Cards Skeleton - Matching your exact structure */}
      {[...Array(5)].map((_, index) => (
        <div 
          key={index} 
          className='border p-4 m-4 rounded-lg shadow-lg'
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          {/* Title Skeleton */}
          <div className='h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] w-3/4 mb-2'></div>

          {/* Cover Image Skeleton */}
          <div className='w-full h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] mb-4 rounded'></div>

          {/* Excerpt Skeleton */}
          <div className='mb-4 space-y-2'>
            <div className='h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]'></div>
            <div className='h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] w-5/6'></div>
            <div className='h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] w-4/5'></div>
          </div>

          {/* Read More Link Skeleton */}
          <div className='h-4 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] w-24 mt-4 inline-block'></div>
        </div>
      ))}

      {/* Loading Animation */}
      <div className="text-center text-gray-500 my-20">
        <div className="inline-flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        </div>
        {/* <p className="text-lg">Loading blogs...</p> */}
      </div>
    </div>
  );
};

export default BlogLoader;