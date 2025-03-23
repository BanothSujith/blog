const bcrypt = require('bcrypt');
const User = require('../models/userModel'); 
const { setUser } = require('../service/auth');

async function handleLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = setUser(user); 
    const { password:_, ...userWithoutPassword } = user._doc;
// console.log(userWithoutPassword)
    res.status(200)
      // .cookie('token', token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'strict',
      // })
      .json({

        user:userWithoutPassword,
        token: token,

      });

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = handleLogin;
