const bcrypt = require("bcrypt");
const User = require("../models/userModel");

async function handlePassWordChange(req, res) {
  const { oldPassword, newPassword } = req.body;
  const user = req.user;

  if (!oldPassword || !newPassword)
    return res
      .status(400)
      .json({ message: "please provide old and new password" });

  if (oldPassword === newPassword)
    return res
      .status(400)
      .json({ message: "old and new password should not be same" });
  
      const userPasword = await User.findById(user.id).select("+password");
  
      if (!userPasword) return res.status(400).json({ message: "user not found" });
  
      const isMatch = await bcrypt.compare(oldPassword, userPasword.password);
  
      if (!isMatch)
    return res.status(400).json({ message: "old password is incorrect" });
  
  
      try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
      await User.findByIdAndUpdate(
      user.id,
      { password: hashedPassword },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "password updated successfully" });
  } catch (error) {
    console.log("error while updating password", error);
    return res
      .status(500)
      .json({
        message: "right now password cannot be updated please try later...!",
      });
  }
}

module.exports = handlePassWordChange;
