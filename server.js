const express = require("express");
const mongoose = require("mongoose");

const app = express();

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error:", err);
    throw err;
  }
}

app.get("/", async (req, res) => {
  try {
    await connectDB();
    res.json({ status: "DB connected ✅" });
  } catch (error) {
    res.status(500).json({ status: "DB failed ❌" });
  }
});

module.exports = app;
