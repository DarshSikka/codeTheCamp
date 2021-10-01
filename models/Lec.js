const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
});
const Lec = mongoose.model("Lecture", schema, "lectures");
module.exports = Lec;
