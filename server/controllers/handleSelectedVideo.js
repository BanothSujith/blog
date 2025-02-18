const Blog = require('../models/blog');
const mongoose = require('mongoose');

const handleSelectedVideo = async (req, res) => {
  const videoId = req.params.video;
  const userId = req.user?.id || [];
  if (!videoId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
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
      { 
        $unwind: '$creator' 
      },
      {
        $addFields:{
          isSubscribed:{
            $in:[userId,{$ifNull : ["$creator.subscribers", []]}]
          }
        }
      },
      {
        $addFields:{
          isliked:{
            $in:[userId,{$ifNull:["$likes",[]]}]
          }
        }
      },
      {
        $addFields:{
          isUnliked:{
            $in:[userId,{$ifNull:["$unlikes",[]]}]
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
          ownerId:'$creator._id',
          profile: '$creator.profile',
          subscribersCount: { $size:{$ifNull:['$creator.subscribers',[]]} },
          isSubscribed: 1,
          isliked:1,
          isUnliked:1,
          likeCount:{$size:{$ifNull:["$likes", []]}},
          dislikeCount:{$size:{$ifNull:["$unlikes",[]]}},
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
