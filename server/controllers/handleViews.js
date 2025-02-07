const Blog = require("../models/blog");


const handleViews = async (req, res) => {
    const { id } = req.params;
    if(!id ) return res.status(400).json({ message: "id is required" });
try { 
        const blog = await Blog.findByIdAndUpdate(id , {$inc:{ views:1}}, { new: true });
        console.log(blog.views)
} catch (error) {
    
}

}


module.exports = handleViews