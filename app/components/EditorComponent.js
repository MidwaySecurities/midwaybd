'use client';
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { createBlog } from '@/lib/actions/blog/createBlog';

const EditorComponent = ({ placeholder }) => {
  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Start typing...',
  }), [placeholder]);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const coverImage = formData.get('coverImage');
    formData.append('content', description);

    const response = await createBlog(formData);
    if (response?.error) {
      setError(response.error);
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      event.target.reset();
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create a New Blog</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Slug */}
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Cover Image */}
          <input
            type="file"
            name="coverImage"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />

          {/* Rich Text Editor */}
          <div className="border border-gray-300 rounded-xl overflow-hidden">
            <JoditEditor
              ref={editor}
              value={description}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setDescription(newContent)}
              onChange={() => {}}
            />
          </div>

          {/* Excerpt */}
          <input
            type="text"
            name="excerpt"
            placeholder="Preview text"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Category */}
          <select
            name="category"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Market News">Market News</option>
            <option value="Investment Tips">Investment Tips</option>
            <option value="Trading Strategies">Trading Strategies</option>
            <option value="Company Updates">Company Updates</option>
            <option value="Others">Others</option>
          </select>

          {/* Tags */}
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-qtp_btn_bg_color hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>

          {/* Messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">Blog created successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default EditorComponent;
