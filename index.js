const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const sendMail = require("./utils/sendMail");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const reportRoutes = require("./routes/reportRoutes");
app.use("/api/reports", reportRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

// Root route
app.get("/", (req, res) => {
  res.send("Street Dog Rescue Backend Running");
});

// ✅ EMAIL TEST ROUTE (THIS WAS MISSING)
app.get("/test-email", async (req, res) => {
  try {
    await sendMail({
      subject: "Test Email – Street Dog Rescue",
      text: "If you received this, email is working correctly.",
    });
    res.send("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Email error:", err.message);
    res.status(500).send("❌ Email failed");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
