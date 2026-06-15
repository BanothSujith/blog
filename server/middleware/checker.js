
const checker = (req, res, next) => {
  const token = req.cookies.token;  
  const routePath = req.path;
  console.log(`Received request for ${routePath} with token: ${token}`);
next();
};

module.exports = checker;