require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      return console.log(
        "Database connection Failure...",
        process.env.MONGODB_URI
      );
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
