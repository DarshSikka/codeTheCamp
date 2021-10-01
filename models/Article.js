const mongoose = require("mongoose");

// schema for mongoose about Articles uploaded by admins
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
});
const Article = mongoose.model("Article", schema, "articles");
module.exports = Article;
