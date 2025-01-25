const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogtype: {
    type: String,
    required: true,
    enum: ["video", "image", "article"],
  },
  coverimgUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
