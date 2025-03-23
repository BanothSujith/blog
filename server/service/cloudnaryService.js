const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

 cloudinaryService = async (localFileName)=> {
  try {
    const response = await cloudinary.uploader.upload(localFileName, { resource_type: "auto" });

   fs.unlinkSync(localFileName);

    // console.log(response.url);
    return response.url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);

    try {
     fs.unlinkSync(localFileName);
    } catch (unlinkError) {
      console.error('Error deleting local file:', unlinkError);
    }

    throw error; 
  }
}

cloudinaryDelete = async(publicURL)=>{
    if(!publicURL) return console.log("no url provided...!");
try {
     const response = await cloudinary.uploader.destroy(publicURL) 
     return response;
} catch (error) {
  console.log("error while deleting from cloudinary:", error);
}}

module.exports = { cloudinaryService,cloudinaryDelete };