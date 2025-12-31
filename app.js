const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// CONNECT DB
connectDB();

// 🔥 FIXED CORS CONFIG
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔥 IMPORTANT: handle preflight
app.options("*", cors());

app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;
