const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
const authMiddleware = require("./middleware/authMiddleware");


app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});


module.exports = app;
