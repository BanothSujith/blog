const Blog = require("../models/blog");

async function handleGallery(req, res) {
  try {
    const userId = req.user?.id;
    const searchQuery = req.query.q?.trim() || "";
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;

    page = Math.max(page, 1);
    limit = Math.min(Math.max(limit, 1), 10);

    const skip = (page - 1) * limit;
    let filter = { blogtype: "image" };

    if (searchQuery) {
      const words = searchQuery.split(" ").filter(Boolean);
      filter.$or = words.flatMap((word) => [
        { title: { $regex: word, $options: "i" } },
        { content: { $regex: word, $options: "i" } },
      ]);
    }

    const galleryBlogs = await Blog.aggregate([
      { $match: filter },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $addFields: {
          isLiked: userId ? { $in: [userId, { $ifNull: ["$likes", []] }] } : false,
          isUnliked: userId ? { $in: [userId, { $ifNull: ["$unlikes", []] }] } : false,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          coverimgUrl: 1,
          description: "$content",
          views: 1,
          likes: { $size: { $ifNull: ["$likes", []] } },
          unlikes: { $size: { $ifNull: ["$unlikes", []] } },
          commentsSize: { $size: { $ifNull: ["$comments", []] } },
          isLiked: 1,
          isUnliked: 1,
          createdAt: 1,
          owner: {
            $arrayElemAt: ["$owner", 0],
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          coverimgUrl: 1,
          description: 1,
          views: 1,
          likes: 1,
          unlikes: 1,
          commentsSize: 1,
          isLiked: 1,
          isUnliked: 1,
          createdAt: 1,
          owner: {
            userName: 1,
            profile: 1,
            subscribers: { $size: { $ifNull: ["$owner.subscribers", []] } },
          },
        },
      },
    ]);

    const totalGalleryBlogs = await Blog.countDocuments(filter);

    res.status(200).json({
      galleryBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalGalleryBlogs / limit),
      totalGalleryBlogs,
      message: galleryBlogs.length ? "Image blogs fetched successfully" : "No image blogs found",
    });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = handleGallery;
