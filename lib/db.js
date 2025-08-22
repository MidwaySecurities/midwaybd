import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://rahat:zI7PVyCzQnJ8XRpn@cluster0.d42h6b0.mongodb.net/midwaybd`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDB;