// import mongoose from "mongoose";

// const connectDB = async () => {
//     try{
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//         console.log("MongoDB connected successfully");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }
// // database handle
// export default connectDB;
import mongoose from "mongoose";

let isConnected = false; // global variable to track the connection

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

//   if () {
//     throw new Error("❌ MONGO_URI is not defined in environment variables");
//   }

  try {
    const db = await mongoose.connect(`mongodb+srv://rahat:zI7PVyCzQnJ8XRpn@cluster0.d42h6b0.mongodb.net/midwaybd`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDB;
