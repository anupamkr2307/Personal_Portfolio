const express = require('express');
const router = express.Router();
const { handleImageUpload } = require('../controllers/uploadController');
const { upload } = require('../services/cloudinary');
const { protect } = require('../middleware/auth');

router.post('/', protect, upload.single('image'), handleImageUpload);

module.exports = router;
