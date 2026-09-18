const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    reporterName: {
      type: String,
      required: true,
      trim: true,
    },
    reporterPhone: {
      type: String,
      required: true,
      trim: true,
    },
    reporterEmail: {
      type: String,
      trim: true,
    },
    storageLocation: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["reported", "stored", "claimed"],
      default: "reported",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);