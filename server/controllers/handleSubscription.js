const User = require('../models/userModel');  

const handleSubscription = async (req, res) => {
  const userId = req.user.id;  
  const channelId = req.body.channelId;  

  if (!channelId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const user = await User.findById(channelId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSubscribed = user.subscribers.includes(userId);

    const update = isSubscribed
      ? { $pull: { subscribers: userId } }  
      : { $addToSet: { subscribers: userId } };  

    await User.findByIdAndUpdate(channelId, update, { new: true });

    return res.status(200).json({ 
      message: isSubscribed ? "Unsubscribed successfully" : "Subscribed successfully",
      isSubscribed: !isSubscribed
    });
  } catch (err) {
    console.error("Subscription error:", err);
    return res.status(500).json({ message: "Something went wrong! Please try again." });
  }
};

module.exports = handleSubscription;
