const { default: connectDB } = require("@/lib/db")
const { default: News } = require("@/model/News")

export const getNews = async () => {
    // Logic to fetch news from the database or an external API
    connectDB()
    const news = await News.find().sort({ publishDate: -1 })
    return news
}