const User = require("../models/userModel");
async function handleRegister(req, res) {
  const { name, email, phoneNo, password } = req.body;
  // console.log( req.files)
  const profile = req.files.profile[0].path;
  const coverimg = req.files?.coverImg[0]?.path || null;

  if (!name || !email || !phoneNo || !password || !profile) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userExists = await User.findOne(
    { email: email } || { phoneNo: phoneNo }
  );
  if (userExists) {

    return res.status(400).json({ message: "User already exists with this mailId" });
  }
  const profileUrl = await cloudinaryService(profile);
  const coverimgUrl = await cloudinaryService(coverimg);
  // console.log(profileUrl,coverimgUrl)
  try {
    const newUser = new User({
      userName: name,
      email,
      phoneNo,
      password,
      profile: profileUrl,
      coverImg: coverimgUrl,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      user: { name, email, phoneNo },
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.phoneNo) {
      return res.status(400).json({ success: false, message: "Phone number already exists" });
    }    res.status(500).json({ message: "Failed to register " });
  }
}

module.exports = handleRegister;
