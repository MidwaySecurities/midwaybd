'use client'
const { createBlog } = require("@/lib/actions/blog/createBlog");

const BlogCreate = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await createBlog(formData);
        console.log(response);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" required />
            <input type="text" name="slug" placeholder="Slug" required />
            <textarea name="content" placeholder="Content" required></textarea>
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
        </form>
    )
}

export default BlogCreate;