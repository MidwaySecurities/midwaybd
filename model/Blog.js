import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true, 
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxLength: 300, 
    },
    coverImage: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: ["Market News", "Investment Tips", "Trading Strategies", "Company Updates", "Others"], 
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // link to your User schema if you have one
    //   required: true,
    // },
    isPublished: {
      type: Boolean,
      default: false,
    },
    seoTitle: {
      type: String,
      trim: true,
      maxLength: 60, 
    },
    seoDescription: {
      type: String,
      trim: true,
      maxLength: 160,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // auto adds createdAt, updatedAt
);

if (mongoose.models.Blog) {
    mongoose.deleteModel('Blog');
}

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
