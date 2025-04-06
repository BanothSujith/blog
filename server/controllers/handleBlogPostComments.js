const Blog = require("../models/blog");
const User = require("../models/userModel");

const handleBlogPostComments = async (req, res) => {
  try {
    const videoId = req.params.video;
    if (!videoId) {
      return res
        .status(404)
        .json({ message: "Video ID not found. Please try again." });
    }

    const { id } = req.user;
    if (!id) {
      return res
        .status(400)
        .json({ message: "User not found. Please try again." });
    }

    const user = await User.findById(id).select("userName");
    // console.log(typeof(user.userName) , user.userName);
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    const content = req.body.comment;
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty." });
    }

    const blog = await Blog.findById(videoId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    blog.comments.push({
      content,
      createdBy: user._id,
      creatorName: user.userName, 
        });

  const commentid =  await blog.save();
  // console.log(commentid.comments[commentid.comments.length-1]._id)
    res
      .status(201)
      .json({
        message: "Comment added successfully",
        comment: { content, createdBy: id, creatorName: user.userName, _id: commentid.comments[commentid.comments.length-1]._id },
      });
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the comment." });
  }
};

module.exports = handleBlogPostComments;
