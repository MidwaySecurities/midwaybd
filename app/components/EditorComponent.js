'use client'
import React, { useState, useRef, useMemo, useEffect } from 'react';
import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";

// Froala CSS
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
// Froala JS
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";

import { getBlogs } from '@/lib/actions/blog/getBlogs';

const EditorComponent = ({ placeholder }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [relatedSlug, setRelatedSlug] = useState('');
  const [relatedBlogId, setRelatedBlogId] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  console.log(content)
  const replyEditor = useRef(null);

  // Editor config
  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Start typing...',
  }), [placeholder]);

  // Fetch latest blog (for related slug/id)
  useEffect(() => {
    const fetchLatestSlug = async () => {
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`);
        const blogs = await data.json()

        if (blogs?.blogs?.length > 0) {
          const latest = blogs.blogs[0];
          setRelatedSlug(latest.slug);
          setRelatedBlogId(latest._id);
        }
      } catch (error) {
        console.error('Error fetching latest slug:', error);
      }
    };
    fetchLatestSlug();
  }, []);

  // ✅ Submit handler

  async function replaceBlobImages(content) {
    console.log(content)
    const div = document.createElement("div");
    div.innerHTML = content;

    const imgs = div.querySelectorAll("img");
    console.log(imgs)
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      const src = img.getAttribute("src");
      console.log(src)
      if (src && src.startsWith("blob:")) {
        // Get blob data
        const blob = await fetch(src).then(r => r.blob());

        // Create form data with custom renamed file
        const formData = new FormData();
        formData.append(
          "file",
          blob,
          `editor-${Date.now()}-${i}.png` // ✅ custom renamed filename
        );

        // Upload to your backend
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log(data)
        if (data.link) {
          // Replace src in HTML
          img.setAttribute("src", data.link);
        }
      }
    }
    console.log(div.innerHTML)
    return div.innerHTML;
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const cleanedContent = await replaceBlobImages(content);
      console.log(cleanedContent)
      const form = new FormData(event.target);
      form.append("content", cleanedContent);
      const res = await fetch("/api/blogs", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create blog");

      setSuccess(true);
      event.target.reset();
      setTitle('');
      setDescription('');
      setContent('');
      setRelatedSlug('');
      setRelatedBlogId('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a New Blog
        </h2>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-6"
        >
          {/* Title */}
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            name="title"
            placeholder="Blog Title"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />

          {/* Slug */}
          <input
            type="text"
            name="slug"
            value={title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}
            placeholder="Slug"
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />

          {/* Related Blog Slug */}
          <input
            type="text"
            name="related_blogs"
            value={relatedSlug}
            readOnly
            placeholder="Related blogs"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />

          {/* Related Blog ID */}
          <input type="hidden" name="relatedBlogs" value={relatedBlogId} />

          {/* Cover Image */}
          <input type="file" name="coverImage" required className="w-full" />

          {/* Multiple Images */}
          <input type="file" name="images" multiple required className="w-full" />

          {/* Froala Editor */}
          <div className="border border-gray-300 rounded-xl overflow-hidden">
            <FroalaEditor
              onModelChange={setContent}
              config={{
                enter: Froalaeditor.ENTER_BR,
                attribution: false,
                heightMin: 200,
                heightMax: 550,

                // ✅ Enable server-side image upload
                // imageUploadURL: "/api/upload",   // our Next.js route
                imageUploadParam: "file",        // field name expected in backend
                imageUploadMethod: "POST",
                imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "webp"],

                // (optional) disable drag-to-replace
                imageDefaultWidth: 300,
                events: {
                  initialized: function () {
                    replyEditor.current = this;
                  },
                  "image.uploaded": function (response) {
                    console.log("Image uploaded:", response);
                  },
                  "image.error": function (error, response) {
                    console.error("Upload error:", error, response);
                  }
                }
              }}
              model={content}
            />
          </div>

          {/* Excerpt */}
          <input
            type="text"
            name="excerpt"
            placeholder="Preview text"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />

          {/* Category */}
          <select
            name="category"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          >
            <option value="">Category</option>
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:opacity-50"
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
