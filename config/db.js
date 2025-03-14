const mongoose = require("mongoose");
const colors = require("colors");

// MongoDB connection
const connectDb = async () => {
  try {
    // Remove deprecated options
    await mongoose.connect(process.env.MONGO_URL);
    console.log(colors.bgCyan(`Connected to database: ${mongoose.connection.host}`));
  } catch (error) {
    console.log("DB Error:", error);
    process.exit(1); // Exit the process if database connection fails
  }
};

module.exports = connectDb;
