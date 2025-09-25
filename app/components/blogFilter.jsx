'use client'
import BlogCategoryDropdown from "./blogCategoryDropDown";
import BlogTabs from "./blogTab";

export function BlogFilters({ activeTab, activeCategory }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Filter Articles</h2>
          <p className="text-sm text-gray-500 mt-1">Find the content that interests you most</p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          <span>Filter & Sort</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Tabs Section */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Content Level
          </label>
          <BlogTabs activeTab={activeTab} />
        </div>

        {/* Category Section */}
        <div className="flex-1 lg:max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <BlogCategoryDropdown activeCategory={activeCategory} />
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Active filters:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {activeTab === 'regular' ? 'Latest' : 'Beginner'}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {activeCategory === 'all' ? 'All Categories' : activeCategory}
          </span>
        </div>
        
        <button 
          onClick={() => {
            window.location.href = '/blogs';
          }}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}