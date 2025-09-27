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

const EditorComponent = ({ placeholder }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    tags: '',
    category: '',
  });
  const [content, setContent] = useState('');
  const [relatedSlug, setRelatedSlug] = useState('');
  const [relatedBlogId, setRelatedBlogId] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDirty, setIsDirty] = useState(false);
  
  const replyEditor = useRef(null);

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Fetch latest blog for related content
  useEffect(() => {
    const fetchLatestSlug = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs`);
        const blogs = await response.json();

        if (blogs?.blogs?.length > 0) {
          const latest = blogs.blogs[0];
          setRelatedSlug(latest.slug);
          setRelatedBlogId(latest._id);
        }
      } catch (error) {
        console.error('Error fetching latest blog:', error);
      }
    };
    fetchLatestSlug();
  }, []);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    setError(null);
  };

  // Handle file uploads with preview
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
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

  console.log(formData)
  // Enhanced image replacement function
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
    if (!coverImage) {
      setError('Cover image is required');
      return false;
    }
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
      form.append("related_blogs", relatedSlug);
      form.append("relatedBlogs", relatedBlogId);
      
      if (coverImage) {
        form.append("coverImage", coverImage);
      }
      
      additionalImages.forEach((file, index) => {
        form.append("images", file);
      });

      setUploadProgress(60);

      const response = await fetch("/api/blogs", {
        method: "POST",
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

  // Froala editor configuration
  const editorConfig = useMemo(() => ({
    attribution: false,
    heightMin: 300,
    heightMax: 600,
    placeholder: placeholder || 'Write your blog content here...',
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
  }), [placeholder]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Create New Article</h1>
                <p className="text-blue-100 mt-1">Share your insights with the community</p>
              </div>
              <div className="flex items-center space-x-3">
                {isDirty && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Unsaved Changes
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {loading && (
            <div className="w-full bg-gray-200 h-1">
              <div 
                className="bg-blue-600 h-1 transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Title & Slug Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Basic Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter your article title"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug (Auto-generated)
                  </label>
                  <input
                    type="text"
                    value={generateSlug(formData.title)}
                    readOnly
                    placeholder="url-slug-will-appear-here"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Content
              </h2>
              
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors">
                <FroalaEditor
                  model={content}
                  onModelChange={setContent}
                  config={editorConfig}
                />
              </div>
            </div>

            {/* Excerpt & Category */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Article Excerpt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of your article..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.excerpt.length}/200 characters
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories?.map((item, index) => {
                      if (item.name === 'Select Category' || item.name === 'All Categories') return null;
                      return (
                        <option key={index} value={item.name}>
                          {item.icon} {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="investing, stocks, market (comma separated)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Images
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image * (Max 5MB)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                      required
                      className="hidden"
                      id="coverImage"
                    />
                    <label htmlFor="coverImage" className="cursor-pointer">
                      <div className="text-gray-500">
                        <svg className="mx-auto h-12 w-12 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-sm">Click to upload cover image</p>
                      </div>
                    </label>
                    {coverImage && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {coverImage.name}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Images (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleAdditionalImagesChange}
                      className="hidden"
                      id="additionalImages"
                    />
                    <label htmlFor="additionalImages" className="cursor-pointer">
                      <div className="text-gray-500">
                        <svg className="mx-auto h-12 w-12 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-sm">Click to upload additional images</p>
                      </div>
                    </label>
                    {additionalImages.length > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {additionalImages.length} file(s) selected
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden Fields */}
            <input type="hidden" name="related_blogs" value={relatedSlug} />
            <input type="hidden" name="relatedBlogs" value={relatedBlogId} />

            {/* Status Messages */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <div className="flex">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                <div className="flex">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-700">Article created successfully!</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure? All unsaved changes will be lost.')) {
                    window.location.reload();
                  }
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Reset Form
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center space-x-2 min-w-[140px] justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Publish Article</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditorComponent;