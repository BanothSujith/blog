const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const connection = require("./connection/connection");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
app.use(cors({
  origin: ["https://blog-front-end-gilt.vercel.app",  "http://localhost:5173"],

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
