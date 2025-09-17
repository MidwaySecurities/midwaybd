// 'use server'

// import Blog from "@/model/Blog";

// const { default: connectDB } = require("@/lib/db");


// export const getBlogs = async (findParams) => {
//     const tags = findParams?.tag;
//     const activeCategory = findParams?.category;
//     await connectDB();
//     try {
//         const query = {};
//         if (tags) {
//             query.tags = tags;
//         }
//         if (activeCategory) {
//             query.category = activeCategory === 'Category' ? { $ne: null } : activeCategory;
//         }
//         const blogs = await Blog.find(query).sort({ createdAt: -1 });
//         return { blogs };
//     } catch (error) {
//         console.error("Error fetching blogs:", error);
//         return { error: "Failed to fetch blogs." };
//     }
// }


'use server'

import Blog from "@/model/Blog";

const { default: connectDB } = require("@/lib/db");

export const getBlogs = async (findParams) => {
    const tags = findParams?.tag;
    const activeCategory = findParams?.category;

    // Pagination params
    const page = parseInt(findParams?.page, 10) || 1; // default page = 1
    const limit = parseInt(findParams?.limit, 10) || 3; // default limit = 10
    const skip = (page - 1) * limit;

    await connectDB();

    try {
        const query = {};
        if (tags) {
            query.tags = tags;
        }
        if (activeCategory) {
            query.category = activeCategory === 'Category' ? { $ne: null } : activeCategory;
        }

        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination
        const total = await Blog.countDocuments(query);
        const totalPages = Math.ceil(total / limit);

        return {
            blogs,
            pagination: {
                total,
                page,
                totalPages,
                limit,
            }
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { error: "Failed to fetch blogs." };
    }
};
