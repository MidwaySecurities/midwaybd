import mongoose from "mongoose";
const newsSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    source: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
  },
  { timestamps: true }
);


export const News = mongoose.models.News || mongoose.model("News", newsSchema);

export default News;


