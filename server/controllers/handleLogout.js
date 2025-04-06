async function handleLogout (req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
}


module.exports = handleLogout;