const { uploadToCloudinaryOrLocal } = require('../services/cloudinary');

const handleImageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    const hostUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = await uploadToCloudinaryOrLocal(req.file, hostUrl);

    res.json({
      success: true,
      message: 'Image uploaded successfully.',
      url: imageUrl,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleImageUpload };
