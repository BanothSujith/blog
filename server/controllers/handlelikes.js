const Blog = require("../models/blog");

const handleLikes = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if user already liked the post
    const hasLiked = blog.likes.includes(req.user.id);

   await Blog.findByIdAndUpdate(
      blogId,
      hasLiked
        ? { $pull: { likes: req.user.id } } 
        : { $addToSet: { likes: req.user.id } ,
        $pull:{unlikes:req.user.id} },
      { new: true }
    );
    res.status(200).json({
      message: hasLiked ? "Liked" : "undoLiked",
    });

  } catch (error) {
    console.error("Error at handleLikes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = handleLikes;
