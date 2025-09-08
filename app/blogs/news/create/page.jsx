'use client'
import { useState } from "react";

export default function CreateNews() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "Others",
    tags: "",
    author: "Admin",
    status: "Draft",
    thumbnail: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("News created successfully (demo only)");
    console.log("Form Submitted:", formData);

    // reset form
    setFormData({
      title: "",
      slug: "",
      content: "",
      category: "Others",
      tags: "",
      author: "Admin",
      status: "Draft",
      thumbnail: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create News</h1>
        
        {message && (
          <p className="mb-4 text-green-600 font-semibold">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter news title"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. market-update"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write the news content..."
              className="w-full border rounded-lg p-2 h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>Market</option>
              <option>Trading</option>
              <option>Company</option>
              <option>IPO</option>
              <option>Economy</option>
              <option>Others</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. stocks, trading"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail URL
            </label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create News
          </button>
        </form>
      </div>
    </div>
  );
}
