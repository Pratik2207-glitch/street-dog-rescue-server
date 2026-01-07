const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const nodemailer = require("nodemailer");
require("dotenv").config();

/* ================= EMAIL SETUP ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ================= CREATE REPORT ================= */
router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY FROM REACT:", req.body);

    const report = new Report(req.body);
    await report.save();

    /* ---------- SEND EMAIL ---------- */
    await transporter.sendMail({
      from: `"Street Dog Rescue" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // NGO email (for now your own)
      subject: "🐶 New Dog Rescue Report",
      html: `
        <h2>New Dog Rescue Report</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Condition:</strong> ${req.body.condition}</p>
        <p><strong>Description:</strong> ${req.body.description}</p>
        <p><strong>Location:</strong> ${req.body.location}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    res.status(201).json({
      message: "Report saved & email sent",
      report,
    });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "Report saved but email failed" });
  }
});

/* ================= GET REPORTS ================= */
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
