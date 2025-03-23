const Blog = require("../models/blog");

const handleGallery = async (req, res) => {
    const userId = req.user?.id 

    try {
        const galleryBlogs = await Blog.aggregate([
            { $match: { blogtype: "image" } },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "owner"
                }
            },
            {
                $addFields: {
                    isLiked: userId ? { $in: [userId, { $ifNull: ["$likes", []] }] } : false,
                    isUnliked: userId ? { $in: [userId, { $ifNull: ["$unlikes", []] }] } : false
                }
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
                    commentsSize:{$size :{$ifNull:["$comments",[]]}},
                    isLiked: 1,
                    isUnliked: 1,
                    createdAt:1,
                    owner: {
                        userName: 1,
                        profile: 1,
                        subscribers: { $size: { $ifNull: ["$owner.subscribers", []] } }
                    }
                }
            }
        ]);

        if (!galleryBlogs.length) {
            return res.status(404).json({ message: "No image blogs found" });
        }

        res.json({ galleryBlogs, message: "Image blogs fetched successfully" });

    } catch (error) {
        console.error("Error fetching gallery:", error);
        res.status(500).json({ message: "Error at gallery fetching" });
    }
};

module.exports = handleGallery;
