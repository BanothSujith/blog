const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const connection = require("./connection/connection");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const User = require("./models/userModel");
const Blog = require("./models/blog");
dotenv.config();

const app = express();
app.use(cors({
  origin: [
    "https://blog-front-end-gilt.vercel.app",
    "http://localhost:5173",
    "http://192.168.1.2:5173"
  ],
  
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

connection(process.env.MONGODB_URI);

app.use("/",routes);

app.get("/test",(req, res) => {
  res.send("Hello World!");
});
app.get("/api/delete",async (req,res)=>{
         await User.deleteMany({});
         await Blog.deleteMany({});
         res.status(200).send("Deleted all users and blogs");
})
app.listen(process.env.PORT, () => {
  console.log("Server running at: " + process.env.PORT);
});
