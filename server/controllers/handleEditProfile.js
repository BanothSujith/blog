const cookieParser = require("cookie-parser");
const User = require("../models/userModel");
const { cloudinaryService ,cloudinaryDelete} = require("../service/cloudnaryService");
const { default: mongoose } = require("mongoose");


async function handleEditProfile(req,res) {
    const user = req.user;
    const profile = req.file;
    const {oldprofile} = req.body;
    if(!profile) return res.status(400).json({message:"profile not found"});
    try {
        if (oldprofile) {
        await cloudinaryDelete(oldprofile);
        //   console.log("Deleted old profile from Cloudinary:", destroyed);
        }}catch(e){
            return  console.log(e)
        }  
    try {
          var ProfileUrl = await cloudinaryService(profile.path) ;
      } catch (error) {
        return   res.status(500).json({message:"Can't upload the profile to cloudinary please try again....!"})
      }
        if(!ProfileUrl) return  res.status(500).json({message:"right now profile cannot updated please try later...!"})  
    try{
        const updateduser = await User.findOneAndUpdate(new mongoose.Types.ObjectId(user.id),{$set:{ profile: ProfileUrl }},{new:true});
        // console.log(updateduser)
        return  res.status(200).json({message:"profile updated successfully",updatedprofile:updateduser.profile})
    }catch(e){
        await cloudinaryDelete(ProfileUrl);
         console.log("error at db update of profile ",e)
       return   res.status(500).json({message:"right now profile cannot updated please try later...!"});
    }
}

module.exports = handleEditProfile;