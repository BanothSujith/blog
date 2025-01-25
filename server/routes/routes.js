const express = require ('express');
const router = express.Router();
const handleRegister = require('../controllers/register');
const handleLogin = require('../controllers/login');
const handleAuth = require('../controllers/handleAuth');
const handleBlog = require('../controllers/handleBlog');
const handleBlogPost = require('../controllers/handleBlogPost');
const upload = require('../middleware/multer.middleware')

router.post('/api/register',handleRegister );
router.post('/api/login',handleLogin );
router.get('/api/auth/me',handleAuth);
router.get('/api/blogs',handleBlog);
router.post('/api/blogs', upload.single('coverimg'), handleBlogPost);



module.exports=router;