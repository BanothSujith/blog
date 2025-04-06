const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const { cloudinaryDelete } = require("../service/cloudnaryService");

async function handleBlogDelete(req, res) {
  const blogId = req.params.blogId;
  const userId = req.user?.id; 

  if(!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: "Invalid request" });
  }
   try {
      const blog = await Blog.findOneAndDelete({ _id: blogId, createdBy: userId });
      if (!blog) {
        return res.status(404).json({ message: "you are not authorized for this activity" });
        
      }
      const coverimgUrl = blog.coverimgUrl;
      const videoUrl = blog.videoUrl || null;
      if(coverimgUrl){
        cloudinaryDelete(coverimgUrl);
      }
      if(videoUrl){
        cloudinaryDelete(videoUrl);
      }
    //   console.log("Blog deleted successfully", blog);
      return res.status(200).json({ message: "Blog deleted successfully" });
   } catch (error) {
        // console.error("Error deleting blog:", error);
        return res.status(500).json({ message: "Internal server error" });
        }
   }


module.exports = handleBlogDelete;