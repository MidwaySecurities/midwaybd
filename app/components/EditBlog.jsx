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

import { categories } from './blogCategoryDropDown';

const EditBlogComponent = ({ slug }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    excerpt: '',
    tags: '',
    category: '',
  });
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [existingCoverImage, setExistingCoverImage] = useState('');
  const [existingImages, setExistingImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDirty, setIsDirty] = useState(false);

  const replyEditor = useRef(null);

  // Load existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load blog');

        setFormData({
          id: data.blog._id,
          title: data.blog.title || '',
          excerpt: data.blog.excerpt || '',
          tags: data.blog.tags?.join(', ') || '',
          category: data.blog.category || '',

        });
        setContent(data.blog.content || '');
        setExistingCoverImage(data.blog.coverImage || '');
        setExistingImages(data.blog.images || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBlog();
  }, [slug]);

  const generateSlug = (title) =>
    title.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    setError(null);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Cover image must be less than 5MB');
        return;
      }
      setCoverImage(file);
      setIsDirty(true);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        setError(`File ${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });
    setAdditionalImages(validFiles);
    setIsDirty(true);
  };

  async function replaceBlobImages(content) {
    const div = document.createElement("div");
    div.innerHTML = content;
    const imgs = div.querySelectorAll("img");

    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      const src = img.getAttribute("src");

      if (src && src.startsWith("blob:")) {
        try {
          const blob = await fetch(src).then(r => r.blob());
          const formData = new FormData();
          formData.append("file", blob, `editor-${Date.now()}-${i}.png`);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          if (data.link) {
            img.setAttribute("src", data.link);
          }
        } catch (error) {
          console.error(`Error uploading image ${i}:`, error);
        }
      }
    }

    return div.innerHTML;
  }


  // Form validation
  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.excerpt.trim()) {
      setError('Excerpt is required');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    if (!content.trim()) {
      setError('Content is required');
      return false;
    }
    // if (!coverImage) {
    //   setError('Cover image is required');
    //   return false;
    // }
    return true;
  };

  // Enhanced submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);
    setUploadProgress(0);

    try {
      // Replace blob images first
      const cleanedContent = await replaceBlobImages(content);
      setUploadProgress(30);

      // Create form data
      const form = new FormData();
      form.append("title", formData.title);
      form.append("slug", generateSlug(formData.title));
      form.append("excerpt", formData.excerpt);
      form.append("category", formData.category);
      form.append("tags", formData.tags);
      form.append("content", cleanedContent);
      // form.append("related_blogs", relatedSlug);
      // form.append("relatedBlogs", relatedBlogId);

      if (coverImage) {
        form.append("coverImage", coverImage);
      }

      additionalImages.forEach((file, index) => {
        form.append("images", file);
      });

      setUploadProgress(60);

      const response = await fetch(`/api/blogs/${formData.id}`, {
        method: "PUT",
        body: form,
      });

      setUploadProgress(90);

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create blog");

      setUploadProgress(100);
      setSuccess(true);
      setIsDirty(false);

      // Reset form
      setFormData({ title: '', excerpt: '', tags: '', category: '' });
      setContent('');
      setCoverImage(null);
      setAdditionalImages([]);

      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => input.value = '');

    } catch (err) {
      setError(err.message);
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  // const editorConfig = useMemo(() => ({
  //   attribution: false,
  //   heightMin: 300,
  //   heightMax: 600,
  //   placeholder: 'Edit blog content...',
  //   enter: Froalaeditor.ENTER_BR,
  //   toolbarButtons: [
  //     'bold', 'italic', 'underline', 'strikeThrough', '|',
  //     'paragraphFormat', 'align', 'formatOL', 'formatUL', '|',
  //     'insertLink', 'insertImage', 'insertVideo', '|',
  //     'undo', 'redo', 'fullscreen'
  //   ],
  //   events: {
  //     initialized: function () { replyEditor.current = this; },
  //     'contentChanged': function () { setIsDirty(true); }
  //   }
  // }), []);

  const editorConfig = useMemo(() => ({
    attribution: false,
    heightMin: 300,
    heightMax: 600,
    placeholder: 'Edit your blog content here...',
    enter: Froalaeditor.ENTER_BR,

    // Toolbar customization
    toolbarButtons: [
      'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript',
      '|', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor',
      '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote',
      '|', 'insertHR', 'insertLink', 'insertImage', 'insertVideo', 'insertTable',
      '|', 'emoticons', 'specialCharacters', 'insertFile', 'html',
      '|', 'undo', 'redo', 'fullscreen', 'selectAll', 'clearFormatting'
    ],

    // Image upload settings
    imageUploadParam: "file",
    imageUploadMethod: "POST",
    imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "webp"],
    imageDefaultWidth: 300,

    // Link settings
    linkAutoPrefix: 'https://',
    linkAlwaysBlank: true,

    events: {
      initialized: function () {
        replyEditor.current = this;
      },
      'contentChanged': function () {
        setIsDirty(true);
      },
      'image.uploaded': function (response) {
        console.log("Image uploaded:", response);
      },
      'image.error': function (error, response) {
        console.error("Upload error:", error, response);
        setError('Image upload failed. Please try again.');
      }
    }
  }), [slug]);


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-white">
          <h1 className="text-3xl font-bold">Edit Article</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Editor */}
          <div>
            <FroalaEditor model={content} onModelChange={setContent} config={editorConfig} />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Category & Tags */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              >
                <option value="">Select category</option>
                {categories.map((item, i) =>
                  <option key={i} value={item.name}>{item.name}</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="comma separated"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2">Current Cover Image:</p>
              {existingCoverImage && (
                <img src={existingCoverImage} alt="cover" className="w-40 rounded-md mb-2" />
              )}
              <input type="file" accept="image/*" onChange={handleCoverImageChange} />
            </div>
            <div>
              <p className="text-sm mb-2">Current Additional Images:</p>
              <div className="flex flex-wrap gap-2">
                {existingImages.map((img, i) => (
                  <img key={i} src={img} alt="" className="w-24 rounded-md" />
                ))}
              </div>
              <input type="file" accept="image/*" multiple onChange={handleAdditionalImagesChange} />
            </div>
          </div>

          {/* Status */}
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">Blog updated successfully!</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-green-600 text-white rounded-xl"
          >
            {loading ? 'Updating...' : 'Update Article'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlogComponent;
