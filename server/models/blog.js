const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogtype: {
    type: String,
    required: true,
    enum: ["video", "image"],
  },
  coverimgUrl: {
    type: String,
    required: true,
  },
videoUrl:{
 type: String,
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
  comments: [{
    content:{
      type: String,
      required: true,
      minlength:1,
      maxlength: 500,
    },
    username:{
      type: String,
      required: true,
    },
    createdAt:{
      type: Date,
      default: Date.now,
    },
  }],
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
