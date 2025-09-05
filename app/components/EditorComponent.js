
'use client'
import React, { useState, useRef, useMemo, useEffect } from 'react';

import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";

let replyEditor = "";

import JoditEditor from 'jodit-react';
import { createBlog } from '@/lib/actions/blog/createBlog';
import { getBlogs } from '@/lib/actions/blog/getBlogs';
const EditorComponent = async ({ placeholder }) => {

  // const editor = useRef(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [content, setContent] = useState("");
  console.log(content)
  const config = useMemo(() => ({

    readonly: false,
    uploader: {
      url: "http://localhost:3000/upload", // your backend API
      insertImageAsBase64URI: false,
      imagesExtensions: ["jpg", "png", "jpeg", "gif"],
      filesVariableName: () => "file", // field name in your backend
      withCredentials: false,
    },
    filebrowser: {
      ajax: {
        url: "http://localhost:3000/files", // optional: browse files API
      },
    },
    placeholder: placeholder || 'Start typing...',
  }), [placeholder]);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    // const coverImage = formData.get('coverImage');
    formData.append('content', content);

    const response = await createBlog(formData);
    console.log(response)
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
  useEffect(() => {
    // fetch blogs to get the latest slug and set it as default value of slug input field
    const fetchLatestSlug = async () => {
      try {
        console.log('Fetching latest slug...');
        const blogs = await getBlogs();
        if (blogs?.blogs?.length > 0) {
          const latestSlug = blogs.blogs[0].slug;
          const latestBlogId = blogs.blogs[0]._id;
          console.log('Latest slug:', latestSlug);
          const slugInput = document.querySelector('input[name="related_blogs"]');
          const slugInputId = document.querySelector('input[name="relatedBlogs"]');
          if (slugInput) {
            slugInput.value = latestSlug;
            slugInput.readOnly = true;
          }
          if (slugInputId) {
            slugInputId.value = latestBlogId;
          }
        }
      } catch (error) {
        console.error('Error fetching latest slug:', error);
      }
    };
    fetchLatestSlug();
  }, [])

  useEffect(() => {
    console.log(content)
    // get files from content
    const files = content.match(/<img [^>]*src="([^"]*)"[^>]*>/g);
    if (files) {
      files.forEach(async (file) => {
        const src = file.match(/src="([^"]*)"/);
        if (src) {
          console.log(src[1]);
          // upload this src to server
          // replace the src in content with the uploaded file url
          //   const uploadedUrl = await uploadFile(src[1]);
          //   setContent((prevContent) =>
          //     prevContent.replace(src[1], uploadedUrl)
          //   );
        }
      });
    }
  }, [content]);

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

          {/* Slug */}
          <input
            type="text"
            name="related_blogs"
            placeholder="related blogs"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="relatedBlogs"
            hidden
            placeholder="related blogs"
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
            {/* <JoditEditor
              ref={editor}
              value={description}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setDescription(newContent)}
              onChange={() => { }}
            /> */}
            <div className="App">
              <FroalaEditor
                onModelChange={setContent}

                config={{
                  enter: Froalaeditor.ENTER_BR,
                  tableStyles: {
                    "no-border": "No border"
                  },
                  useClasses: false,
                  attribution: false,
                  toolbarSticky: false,
                  charCounterCount: false,
                  fontFamilySelection: true,
                  fontSizeSelection: true,
                  paragraphFormatSelection: true,
                  heightMin: 200,
                  heightMax: 550,
                  linkInsertButtons: [],
                  toolbarButtons: [
                    "bold",
                    "italic",
                    "underline",
                    "strikeThrough",
                    "subscript",
                    "superscript",
                    "fontFamily",
                    "fontSize",
                    "textColor",
                    "paragraphFormat",
                    "lineHeight",
                    "align",
                    "formatOL",
                    "formatUL",
                    "outdent",
                    "indent",
                    "leftToRight",
                    "rightToLeft",
                    "insertLink",
                    "insertImage",
                    "insertTable",
                    "emoticons",
                    "personalize",
                    "insertButton",
                    "clearFormatting",
                    "selectAll",
                    "insertHR",
                    "undo",
                    "redo",
                    "fullscreen",
                    "html"
                  ],
                  linkList: [],
                  events: {
                    initialized: function () {
                      replyEditor = this;
                    },
                    blur: () => {
                      console.log(replyEditor.html.get(true));
                    }
                  }
                }}
                model={content}
              />
            </div>
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
