const Blog = require("../models/blog");
const User = require("../models/userModel.js");
const { cloudinaryService } = require("../service/cloudnaryService.js");
const fs = require("fs/promises");
const handleBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const coverimg = req.files;
 


    if (!coverimg) {
      return res.status(400).json({ error: "Cover image is required" });
    }
    const user = req.user.id
   
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const userName = await User.findOne({_id:user}).select("userName")
    // console.log("user",userName.userName)
    const coverimgUrl = await cloudinaryService(coverimg.coverImg[0].path);
    const videoUrl = await cloudinaryService(coverimg.video[0].path);
   
    // console.log(userExist.name);
    const newBlog = new Blog({
      title,
      content,
      coverimgUrl,
      blogtype:"video",
      createdBy:userName._id,
      videoUrl,
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }

};

module.exports = handleBlogPost;
