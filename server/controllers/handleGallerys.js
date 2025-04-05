const Blog = require("../models/blog");

async function handleGallery(req, res) {
  const userId = req.user?.id;
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
          from: "users", 
          localField: "createdBy",
          foreignField: "_id",
          as: "ownerData",
        },
      },
      {
        $addFields:{
          isLiked: {
            $in: [
              userId,
              {
                $map: {
                  input: { $ifNull: ["$likes", []] },
                  as: "like",
                  in: { $toString: "$$like" },
                },
              },
            ],
          },
          isUnliked: {
            $in: [
              userId,
              {
                $map: {
                  input: { $ifNull: ["$unlikes", []] },
                  as: "unlike",
                  in: { $toString: "$$unlike" }, 
                },
              },
            ],
          },
        }
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
          likeCount: { $size: { $ifNull: ["$likes", []] } },
          unlikeCount: {$size:{$ifNull:["$unlikes",[]]}},
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
