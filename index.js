require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ MUST COME BEFORE ROUTES
app.use(cors());
app.use(express.json());   // 🔥 THIS IS THE FIX

// ✅ ROUTES
const reportRoutes = require("./routes/reportRoutes");
app.use("/api/reports", reportRoutes);

// ✅ DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("DB ERROR:", err));

// ✅ SERVER
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
