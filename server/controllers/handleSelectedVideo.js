const handleSelectedVideo = async (req, res) => {
  const videoId = req.params.video;
  const userId = req.user?.id;
  if (!videoId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    // Increment the view count
    await Blog.findByIdAndUpdate(videoId, { $inc: { views: 1 } });

    const result = await Blog.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(videoId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      {
        $addFields: {
          // Ensure $creator.subscribers is an array
          isSubscribed: {
            $in: [userId, { $ifNull: ["$creator.subscribers", []] }]
          },
        },
      },
      {
        $addFields: {
          isLiked: {
            $in: [userId, "$likes"]
          }
        }
      },
      {
        $addFields: {
          isUnliked: {
            $in: [userId, "$unlikes"]
          }
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          videoUrl: 1,
          comments: 1,
          userName: '$creator.userName',
          ownerId: '$creator._id',
          profile: '$creator.profile',
          subscribersCount: { $size: '$creator.subscribers' },
          isSubscribed: 1,
          isLiked: 1,
          isUnliked: 1,
          likeCount: { $size: "$likes" },
          dislikeCount: { $size: "$unlikes" },
        },
      },
    ]);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Video not found' });
    }

    return res.status(200).json({ video: result[0], message: 'Video selected successfully' });
  } catch (err) {
    console.error('Video Selection error at /api/:video', err);
    return res.status(500).json({ message: 'Something went wrong! Please try again.' });
  }
};

module.exports = handleSelectedVideo;
