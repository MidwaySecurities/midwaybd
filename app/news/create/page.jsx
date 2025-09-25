'use client'
import React, { useState } from "react";

const categories = ["Market", "Trading", "Company", "IPO", "Economy", "Others"];
const statuses = ["Draft", "Published", "Archived"];

const CreateNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "Others",
    tags: "",
    status: "Draft",
    thumbnail: "",
    source: "",
    priority: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()), // convert string → array
        }),
      });

      if (response.ok) {
        alert("News created successfully!");
        setFormData({
          title: "",
          slug: "",
          content: "",
          category: "Others",
          tags: "",
          status: "Draft",
          thumbnail: "",
          source: "",
          priority: 0,
        });
      } else {
        const error = await response.json();
        alert("Error: " + error.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Create News</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            className="mt-1 w-full border rounded-lg p-2"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
          >
            {statuses.map((st) => (
              <option key={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
          />
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium">Source</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <input
            type="number"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        >
          Create News
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
