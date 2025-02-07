const Blog = require("../models/blog");
const User = require("../models/userModel.js");
const { cloudinaryService } = require("../service/cloudnaryService.js");


const handleImgPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const coverImg = req.file;
 


    if (!coverImg) {
      return res.status(400).json({ error: "Cover image is required" });
    }
   const user =  req.user.id
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const userName = await User.findOne({_id:user}).select('userName')
    // console.log("username",userName.userName)
    const coverimgUrl = await cloudinaryService(coverImg.path);
   
    // console.log(userExist.name);
    const newBlog = new Blog({
      title,
      content,
      coverimgUrl,
      blogtype:'image',
      createdBy: userName.id,
      creatorName:userName.userName
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
