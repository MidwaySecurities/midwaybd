"use client";

import Link from "next/link";

const BlogPagination = ({ currentPage, totalPages, activeTab, activeCategory, perPage }) => {
  if (totalPages <= 1) return null; // No pagination needed

  // Generate page numbers (e.g., [1,2,3,4,5])
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Build query string for links
  const buildUrl = (page) =>
    `/blogs?tab=${activeTab}&category=${activeCategory}&page=${page}&limit=${perPage}`;

  return (
    <nav aria-label="Page navigation" className="flex justify-center my-6">
      <ul className="flex items-center -space-x-px h-10 text-base">
        {/* Previous Button */}
        <li>
          {currentPage > 1 ? (
            <Link
              href={buildUrl(currentPage - 1)}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </Link>
          ) : (
            <span className="flex items-center justify-center px-4 h-10 text-gray-400 bg-gray-100 border border-gray-300 rounded-s-lg cursor-not-allowed">
              Prev
            </span>
          )}
        </li>

        {/* Page Numbers */}
        {pages.map((page) => (
          <li key={page}>
            <Link
              href={buildUrl(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                page === currentPage
                  ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {page}
            </Link>
          </li>
        ))}

        {/* Next Button */}
        <li>
          {currentPage < totalPages ? (
            <Link
              href={buildUrl(currentPage + 1)}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </Link>
          ) : (
            <span className="flex items-center justify-center px-4 h-10 text-gray-400 bg-gray-100 border border-gray-300 rounded-e-lg cursor-not-allowed">
              Next
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default BlogPagination;
