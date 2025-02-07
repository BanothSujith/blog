const User = require("../models/userModel");



const handleUserDetails = async (req,res)=>{
    const {userId } = req.params;
    try {
        const user = await User.findOne({_id:userId});
        // console.log(user);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    
    } catch (error) {
        console.error("user fetch error go to api/user/:id ", error);
    }
}


module.exports = handleUserDetails