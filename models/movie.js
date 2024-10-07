const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    maxlength: 250,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
