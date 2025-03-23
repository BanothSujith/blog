const express = require("express");
<<<<<<< HEAD
const cors = require("cors");
=======
const cors = require('cors');
const mongoose = require("mongoose");
>>>>>>> f99cec8fe4790ead98e59cad7025df7163a15d25
const dotenv = require("dotenv");
const connection = require("./connection/connection");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const authorized = require("./middleware/auth");
dotenv.config();

const app = express();
<<<<<<< HEAD
const allowedOrigins = [
  "https://blog-front-end-gilt.vercel.app",
  "http://localhost:5173",
  "http://192.168.65.34:5173/"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

=======
app.use(cors({
  origin: "https://blog-front-end-gilt.vercel.app",
  credentials: true,
}));
>>>>>>> f99cec8fe4790ead98e59cad7025df7163a15d25
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
