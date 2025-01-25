const Blog = require("../models/blog");
const User = require("../models/userModel.js");
const { cloudinaryService } = require("../service/cloudnaryService.js");

const handleBlogPost = async (req, res) => {
  try {
    const { title, content, blogtype } = req.body;

    const coverimg = req.file;

    if (!coverimg) {
      return res.status(400).json({ error: "Cover image is required" });
    }

    const coverimgUrl = await cloudinaryService(coverimg.path);
    const user = req.cookies.user ? JSON.parse(req.cookies.user) : null; 
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const userExist = await User.findOne({ email: user.email }).select("name");
    const newBlog = new Blog({
      title,
      content,
      coverimgUrl,
      blogtype,
      createdBy: userExist,
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
