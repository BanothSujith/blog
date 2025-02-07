const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connection = require("./connection/connection");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const authorized = require("./middleware/auth");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

connection(process.env.MONGODB_URI);

app.use("/",routes);

app.get("/test", authorized,(req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log("Server running at: " + process.env.PORT);
});
