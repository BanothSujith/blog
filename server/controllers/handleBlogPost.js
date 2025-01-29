const Blog = require("../models/blog");
const { cloudinaryService } = require("../service/cloudnaryService.js");
const fs = require("fs/promises");
const handleBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const coverimg = req.files;
 


    if (!coverimg) {
      return res.status(400).json({ error: "Cover image is required" });
    }
    const user = JSON.parse( req.cookies.user)
   
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const coverimgUrl = await cloudinaryService(coverimg.coverImg[0].path);
    const videoUrl = await cloudinaryService(coverimg.video[0].path);
   
    // console.log(userExist.name);
    const newBlog = new Blog({
      title,
      content,
      coverimgUrl,
      blogtype:"video",
      createdBy: user.name,
      videoUrl
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
