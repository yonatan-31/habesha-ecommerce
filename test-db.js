import mongoose from 'mongoose';

const testConnection = async () => {
  try {
    await mongoose.connect('mongodb+srv://yonatanasmare31:yonatan3157@cluster0.wmjcdko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("✅ MongoDB connected successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Connection failed:", error);
    process.exit(1);
  }
};

testConnection();
