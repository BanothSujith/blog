const Blog = require('../models/blog');

const handleSelectedVideo = async (req, res) => {
  const videoId = req.params.video;

  if (!videoId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const video = await Blog.findByIdAndUpdate(
      videoId,
      { $inc: { views: 1 } }, 
      { new: true } 
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
console.log(video.views)
    return res.status(200).json({ video, message: "Video selected successfully" });
  } catch (err) {
    console.error("Video Selection error at /api/:video", err);
    return res.status(500).json({ message: "Something went wrong! Please try again." });
  }
};

module.exports = handleSelectedVideo;
