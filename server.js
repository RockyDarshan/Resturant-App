const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// Env configuration
dotenv.config();

// DB connections
connectDb();

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON request bodies
app.use(morgan("dev")); // Logs HTTP requests

// Routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user",require("./routes/userRoutes"));
app.use("/api/v1/resturant",require("./routes/resturantRoutes"));
app.use("/api/v1/category",require("./routes/categoryRoutes"));
app.use("/api/v1/food",require("./routes/foodRoutes"));

// Root route
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to the API</h1>");
});

// Server listening
const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
