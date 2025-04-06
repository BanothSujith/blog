const Blog = require("../models/blog");


async function handledeleteComment(req,res){
    const { id } = req.user;
    const commentid =req.params.id
if(!id || !commentid){
    return res.status(400).json({message:"User not found"})
}
 
try{
    const comment = await Blog.findOneAndUpdate(
        { "comments._id": commentid },
        { $pull: { comments: { _id: commentid } } },
        { new: true }
      );
res.status(200).json({message:"Comment deleted successfully"})
}catch(e){
    return res.status(500).json({message:e.message})
    console.error(e.message)    
}

}

module.exports = handledeleteComment;