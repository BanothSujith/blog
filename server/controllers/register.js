const User = require('../models/userModel')
async function handleRegister (req,res){
    const { name, email, phoneNo, password } = req.body;
      // console.log( req.files)
      const profile = req.files.profile[0].path;
      const coverimg = req.files?.coverImg[0]?.path || null;

    if (!name || !email || !phoneNo || !password || !profile) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const userExists = await User.findOne({email:email} || {phoneNo:phoneNo})
if(userExists){
  console.log('User already exists')

    return res.status(400).json({ error: 'User already exists' });
}  
const profileUrl = await cloudinaryService(profile);
const coverimgUrl = await cloudinaryService(coverimg);
// console.log(profileUrl,coverimgUrl)
    try {
      const newUser = new User({ userName:name, email, phoneNo, password ,profile:profileUrl,coverImg:coverimgUrl });
      await newUser.save();
      res.status(201).json({
        success:true,
        user: { name, email, phoneNo },
      });
    } catch (error) {
      console.error("error while registration ", error);
      res.status(500).json({ error: 'Failed to register user' });
    }
}


module.exports = handleRegister