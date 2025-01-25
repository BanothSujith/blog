const cloudinary = require('cloudinary').v2;
const fs = require('fs');
 cloudinaryService = async (localFileName)=> {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

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

module.exports = { cloudinaryService };