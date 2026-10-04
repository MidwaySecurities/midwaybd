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
      type: String, // URL/path to cover image
      trim: true,
    },
    images: {
      type: [String], // array of image URLs/paths
      default: [],
    },
    category: {
      type: String,
      required: true,
      enum: ["Market News", "Investment Tips", "Trading Strategies", "Company Updates", "Others"],
    },
    relatedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Optional: populate relatedBlogs automatically when finding
// blogSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "relatedBlogs",
//     select: "title slug coverImage",
//     options: { limit: 5 },
//   });
//   next();
// });

if (mongoose.models.Blog) {
  mongoose.deleteModel("Blog");
}
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
