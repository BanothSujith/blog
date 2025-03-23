const Blog = require("../models/blog");

async function handleBlog(req, res) {
  try {
    const searchQuery = req.query.q || ""; 
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit; 

    let filter = {};

    if (searchQuery.trim()) {
      const words = searchQuery.split(" ").filter(Boolean);

      filter = {
        $or: words.flatMap((word) => [
          { title: { $regex: word, $options: "i" } },
          { content: { $regex: word, $options: "i" } },
        ]),
      };
    }

    // ✅ Apply pagination using `.skip(skip).limit(limit)`
    const blogs = await Blog.find(filter)
      .populate("createdBy", "profile userName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // ✅ Count total matching blogs
    const totalBlogs = await Blog.countDocuments(filter);

    res.status(200).json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      totalBlogs,
      message: blogs.length ? "Blogs fetched successfully" : "No blogs found",
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = handleBlog;
