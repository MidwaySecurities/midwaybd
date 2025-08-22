'use client'

import { useState } from "react";

const { createBlog } = require("@/lib/actions/blog/createBlog");

const BlogCreate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await createBlog(formData);
        console.log(response);
        if (response?.error) {
            setError(response.error);
            setSuccess(false);
        } else {
            setError(null);
            setSuccess(true);
            event.target.reset(); // Reset form on success
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" required />
            <input type="text" name="slug" placeholder="Slug" required />
            <textarea name="content" placeholder="Content" required></textarea>
            {/* content should be a rich text editor */}
            
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
        </form>
    )
}

export default BlogCreate;