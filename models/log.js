const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  type: { type: String, enum: ["error", "success"], required: true },
  message: { type: String, required: true },
  stack: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  statusCode: { type: Number },
  movieDetails: { type: Object },
  endpoint: { type: String },
});

module.exports = mongoose.model("log", logSchema);
