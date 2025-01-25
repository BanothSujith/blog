function handleAuth(req,res) {
    res.status(200).json({
        Authenticated: true,
        user: req.user, 
      });
}


module.exports = handleAuth;