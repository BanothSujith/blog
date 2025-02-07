const mongoose = require("mongoose");
const User = require("./userModel"); 

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    creatorName:{
      type:String,
    },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    blogtype: {
      type: String,
      required: true,
      enum: ["video", "image"],
    },
    coverimgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views:{
      type: Number,
      default: 0
    },
   
    comments: [commentSchema], 
  },
  
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
