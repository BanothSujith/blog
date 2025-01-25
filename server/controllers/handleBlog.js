const Blog = require("../models/blog");

async function handleBlog(req, res) {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      blogs,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = handleBlog;
