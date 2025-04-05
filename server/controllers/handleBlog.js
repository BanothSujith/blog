const Blog = require("../models/blog");

async function handleBlog(req, res) {
  try {
    const searchQuery = req.query.q?.trim() || "";
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;

    page = Math.max(page, 1);
    limit = Math.min(Math.max(limit, 1), 10);

    const skip = (page - 1) * limit;

    const matchStage = { blogtype: "video" };

    const words = searchQuery.split(" ").filter(Boolean);
    if (words.length) {
      matchStage.$or = words.flatMap((word) => [
        { title: { $regex: word, $options: "i" } },
        { content: { $regex: word, $options: "i" } },
        { "createdByData.userName": { $regex: word, $options: "i" } },
      ]);
    }

    const blogs = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdByData",
        },
      },
      { $unwind: "$createdByData" },
      { $match: matchStage },
      {
        $sort: { createdAt: -1 },
      },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          title: 1,
          content: 1,
          createdAt: 1,
          createdBy: "$createdByData._id",
          userName: "$createdByData.userName",
          profile: "$createdByData.profile",
          coverimgUrl: 1,
          blogtype: 1,
        },
      },
    ]);

    const totalBlogsData = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdByData",
        },
      },
      { $unwind: "$createdByData" },
      { $match: matchStage },
      { $count: "total" },
    ]);

    const totalBlogs = totalBlogsData[0]?.total || 0;

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
