const Blog = require("../models/blog");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const handleUserDetails = async (req, res) => {
  const { userId } = req.params;
//   console.log(req.user);
  if (!userId) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const result = await User.aggregate([
      {
        $match: { _id: userObjectId }, 
      },
      {
        $lookup: {
          from: "blogs",
          localField: "_id",
          foreignField: "createdBy",
          as: "blogs",
        },
      },
      {
    $addFields:{
        "blogs":{
            $sortArray:{
                input: "$blogs",
              sortBy: { createdAt: -1 },
            }
        }
    }
       },
      {
        $addFields: {
          isSubscribed: {
            $in: [req.user.id, "$subscribers"],
          },
        },
      },
      {
        $project: {
          userName: 1,
          profile: 1,
          coverImg:1,
          subscribersCount: { $size: "$subscribers" },
          isSubscribed: 1,
          totalBlogCount:{$size:"$blogs"},
          blogs: {
            _id: 1,
            title: 1,
            coverimgUrl:1,
            blogtype:1,
            views:1,
            createdAt:1,
          },
        },
      },
    ]);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: result[0], 
      message: "User details and blogs fetched successfully",
    });
  } catch (error) {
    console.error("User fetch error at /api/user/:id", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = handleUserDetails;
