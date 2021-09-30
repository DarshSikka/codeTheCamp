const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pack: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: false,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  articlesUsed: {
    type: Number,
    required: false,
    default: 0,
  },
  videosWatched: {
    type: Number,
    required: false,
    default: 0,
  },
  groupClassesDone: {
    type: Number,
    required: false,
    default: 0,
  },
  oneOnOneClass: {
    type: Number,
    default: 0,
    required: false,
  },
  subject: {
    type: String,
    required: true,
  },
});
const Student = mongoose.model("Student", studentSchema, "students");
module.exports = Student;
