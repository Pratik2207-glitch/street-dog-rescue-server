const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    location: { type: String, required: true },
    condition: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
