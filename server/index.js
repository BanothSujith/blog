const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connection = require("./connection/connection");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const authorized = require("./middleware/auth");
dotenv.config();

const app = express();
app.use(cors({
  origin: "https://blog-front-end-gilt.vercel.app/",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

connection(process.env.MONGODB_URI);

app.use("/",routes);

app.get("/test",(req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log("Server running at: " + process.env.PORT);
});
