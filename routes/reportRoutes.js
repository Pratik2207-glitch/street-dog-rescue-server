const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const sendMail = require("../utils/sendMail");

router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY FROM REACT:", req.body);

    const report = new Report(req.body);
    await report.save();

    // Send email (NON-BLOCKING)
    sendMail(req.body);

    res.status(201).json({
      message: "Report submitted successfully",
    });
  } catch (error) {
    console.error("❌ Report submit error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
