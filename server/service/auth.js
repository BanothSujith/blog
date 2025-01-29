const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function setUser(user) {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

function verifyUser(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const error = new Error("Invalid token");
  }

  return decoded, error;
}

module.exports = { setUser, verifyUser };
