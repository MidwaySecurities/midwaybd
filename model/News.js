import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
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
      required: true, // can hold HTML if using a rich-text editor
    },
    category: {
      type: String,
      enum: ["Market", "Trading", "Company", "IPO", "Economy", "Others"],
      default: "Others",
    },

    // tags: {
    //   type: [String],
    //   index: true,
    // },
    // author: {
    //   type: String, // or mongoose.Schema.Types.ObjectId if linking to a User collection
    //   default: "Admin",
    // },
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    thumbnail: {
      type: String, // image URL
    },
    source: {
      type: String, // if shared from external site
    },
    priority: {
      type: Number, // e.g., 1 = top priority news
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes for fast searching
newsSchema.index({ title: "text", content: "text" });

const News = mongoose.models.News || mongoose.model("News", newsSchema);

export default News;
