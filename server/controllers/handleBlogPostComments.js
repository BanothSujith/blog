const Blog = require("../models/blog");
const handleBlogPostComments = async (req, res) => {
const id = req.params.id; 
const {content, username} = req.body;
const blog = await Blog.findById(id);
try {
    if (!blog) {
        return res.status(404).json({message: "Blog not found"});
    }
    blog.comments.push({content, username, createdAt: new Date()});
    await blog.save();
    res.status(201).json("Comment added successfully");
} catch (error) {
    console.error(error);
    
}
}

module.exports = handleBlogPostComments;
