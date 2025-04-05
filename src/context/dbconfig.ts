import mongoose from "mongoose";

async function connectDB() {
  await mongoose.connect(process.env.CONNECT_MONGO || "");
  console.log("MongoDB connected");
}

connectDB().catch((error) =>
  console.log(`Error connecting to MongoDB: ${error}`)
);

export default mongoose;
