'use client';
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { createBlog } from '@/lib/actions/blog/createBlog';

const EditorComponent = ({ placeholder }) => {

  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  console.log("description", description);
  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Start typing...'
  }), [placeholder]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const coverImgae = formData.get('coverImage');
    console.log("coverImgae", coverImgae);
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
  }


  return (
    <div className='max-w-screen-xl m-auto mt-16 p-4'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
        <div className='flex flex-col gap-8'>
          <input type="text" name="title" placeholder="Title" required />
          <input type="text" name="slug" placeholder="Slug" required />
          {/* coverImage */}
          <input type = 'file' name = 'coverImage' placeholder = 'Cover Image' required />
          <JoditEditor
            ref={editor}
            value={description}
            config={config}
            tabIndex={1}
            onBlur={newContent => setDescription(newContent)}
            onChange={() => { }}
          />
          
          <input type="text" name="excerpt" placeholder="Excerpt" required />
          <input type="text" name="coverImage" placeholder="Cover Image URL" required />
          <select name="category" required>
            <option value="Market News">Market News</option>
            <option value="Investment Tips">Investment Tips</option>
            <option value="Trading Strategies">Trading Strategies</option>
            <option value="Company Updates">Company Updates</option>
            <option value="Others">Others</option>
          </select>
          <input type="text" name="tags" placeholder="Tags (comma separated)" />
          <input type="text" name="author" placeholder="Author ID" required />
          <button type="submit">Create Blog</button>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>Blog created successfully!</p>}
        </div>
      </form>
    </div>
  );
};

export default EditorComponent;
