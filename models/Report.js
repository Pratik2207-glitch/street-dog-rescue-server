const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    condition: { type: String, required: true },
    description: String,
    location: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
