const express = require("express");
const router = express.Router();
const handleRegister = require("../controllers/register");
const handleLogin = require("../controllers/login");
const handleBlog = require("../controllers/handleBlog");
const handleBlogPost = require("../controllers/handleBlogPost");
const upload = require("../middleware/multer.middleware");
const handleBlogPostComments = require("../controllers/handleBlogPostComments");
const handleImgPost = require("../controllers/handleImgPost");
const authorized = require("../middleware/auth");
const handleSelectedVideo = require("../controllers/handleSelectedVideo");
const handleUserDetails = require("../controllers/handleUserDetails");
const handleSubscription = require("../controllers/handleSubscription");
const handleLikes = require("../controllers/handlelikes");
const handleUnLikes = require("../controllers/handleUnlike");
const handleGallery = require("../controllers/handleGallerys");
const handleEditProfile = require("../controllers/handleEditProfile");
const handlechatbot = require("../controllers/handlechatbot");
// const authorized = require('../middleware/auth')

router.post(
  "/api/register",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "coverImg", maxCount: 1 },
  ]),
  handleRegister
);

router.post("/api/login", handleLogin);
router.get("/api/blogs", handleBlog);

router.post(
  "/api/video",
  authorized,
  upload.fields([
    { name: "coverImg", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  authorized,
  handleBlogPost
);

router.post("/api/img", upload.single("coverImg"), authorized, handleImgPost);

router.post("/api/:video/comments", authorized, handleBlogPostComments);

router.get("/api/video/:video", authorized, handleSelectedVideo);

router.get("/api/user/:userId", authorized, handleUserDetails);

router.post("/api/subscribe", authorized, handleSubscription);

router.post("/api/like/:blogId", authorized, handleLikes);

router.post("/api/unlike/:blogId", authorized, handleUnLikes);

router.get("/api/gallery",authorized, handleGallery);

router.post("/api/editprofile", upload.single("profileImage"),authorized,handleEditProfile);
router.post("/api/chatbot",handlechatbot);
module.exports = router;
