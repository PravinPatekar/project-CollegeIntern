const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { type: string, required: true, unique: true, trim: true },
    fullName: { type: string, required: true },
    logoLink: { type: string, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("college", collegeSchema);
