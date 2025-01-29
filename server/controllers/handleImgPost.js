const Blog = require("../models/blog");
const { cloudinaryService } = require("../service/cloudnaryService.js");


const handleImgPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const coverImg = req.file;
 


    if (!coverImg) {
      return res.status(400).json({ error: "Cover image is required" });
    }
    const user = JSON.parse( req.cookies.user)
   
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const coverimgUrl = await cloudinaryService(coverImg.path);
   
    // console.log(userExist.name);
    const newBlog = new Blog({
      title,
      content,
      coverimgUrl,
      blogtype:'image',
      createdBy: user.name,
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }

};

module.exports = handleImgPost;
