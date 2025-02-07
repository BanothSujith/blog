const Blog = require("../models/blog");

async function handleBlog(req, res) {
  try {
    const blogs = await Blog.find()
      .populate("createdBy", "profile userName") 
      .sort({ createdAt: -1 }); 
    res.status(200).json({
      blogs,
      message: "Blogs fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = handleBlog;
