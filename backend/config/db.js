const dns = require("node:dns");

// Fix MongoDB Atlas DNS resolution issues
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
