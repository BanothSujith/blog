const Blog = require("../models/blog");

async function handleGallery(req, res) {
  try {
    const searchQuery = req.query.q?.trim() || "";
    const words = searchQuery.split(" ").filter(Boolean);

    const matchStage = { blogtype: "image" };

    if (words.length > 0) {
      matchStage.$or = words.flatMap((word) => [
        { title: { $regex: word, $options: "i" } },
        { content: { $regex: word, $options: "i" } },
        { "ownerData.userName": { $regex: word, $options: "i" } },
      ]);
    }

    const galleryBlogs = await Blog.aggregate([
      {
        $lookup: {
          from: "users", // collection name in MongoDB (not model name)
          localField: "createdBy",
          foreignField: "_id",
          as: "ownerData",
        },
      },
      { $unwind: "$ownerData" },
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          title: 1,
          content: 1,
          coverimgUrl: 1,
          createdAt: 1,
          likes: 1,
          unlikes: 1,
          isLiked: 1,
          isUnliked: 1,
          blogtype: 1,
          owner: {
            _id: "$ownerData._id",
            userName: "$ownerData.userName",
            profile: "$ownerData.profile",
            subscribers: { $size: { $ifNull: ["$ownerData.subscribers", []] } },
          },
        },
      },
    ]);

    res.status(200).json({
      galleryBlogs,
      message: galleryBlogs.length
        ? "Gallery blogs fetched successfully"
        : "No blogs found",
    });
  } catch (error) {
    console.error("Error fetching gallery blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = handleGallery;
