const Blog = require("../models/blog");

async function handleBlog(req, res) {
  try {
    const searchQuery = req.query.q?.trim() || "";
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;

    page = Math.max(page, 1);
    limit = Math.min(Math.max(limit, 1), 10);

    const skip = (page - 1) * limit;

    let filter = { blogtype: "video" }; // Always only video blogs

    if (searchQuery) {
      const words = searchQuery.split(" ").filter(Boolean);
      filter.$or = words.flatMap((word) => [
        { title: { $regex: word, $options: "i" } },
        { content: { $regex: word, $options: "i" } },
      ]);
    }

    const blogs = await Blog.find(filter)
      .populate("createdBy", "profile userName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

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
