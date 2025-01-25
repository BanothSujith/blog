const User = require('../models/userModel')
async function handleRegister (req,res){
    const { name, email, phoneNo, password } = req.body;

    if (!name || !email || !phoneNo || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const userExists = await User.findOne({email:email} || {phoneNo:phoneNo})
if(userExists){
  console.log('User already exists')

    return res.status(400).json({ error: 'User already exists' });
}  
    try {
      const newUser = new User({ name, email, phoneNo, password });
      await newUser.save();
      res.status(201).json({
        success:true,
        user: { name, email, phoneNo },
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
}


module.exports = handleRegister