const express = require ('express');
const router = express.Router();
const handleRegister = require('../controllers/register');
const handleLogin = require('../controllers/login');
const handleAuth = require('../controllers/handleAuth');
const handleBlog = require('../controllers/handleBlog');
const handleBlogPost = require('../controllers/handleBlogPost');
const upload = require('../middleware/multer.middleware')
const handleBlogPostComments = require('../controllers/handleBlogPostComments');
const handleImgPost = require('../controllers/handleImgPost');
// const authorized = require('../middleware/auth')



router.post('/api/register',handleRegister );
router.post('/api/login',handleLogin );
router.get('/api/auth/me',handleAuth);
router.get('/api/blogs',handleBlog);
router.post('/api/video',  upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]), handleBlogPost);
  router.post('/api/img',upload.single('coverImg'),handleImgPost)
router.post('/api/blog/:id/comments', handleBlogPostComments);



module.exports=router;