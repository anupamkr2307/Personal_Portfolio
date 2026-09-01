const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

// Ensure local upload folder exists for disk fallback
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|svg|gif/;
    const extMatch = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeMatch = allowedTypes.test(file.mimetype);

    if (extMatch && mimeMatch) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpg, jpeg, png, webp, svg, gif) are allowed!'));
  },
});

const uploadToCloudinaryOrLocal = async (file, hostUrl) => {
  if (isCloudinaryConfigured) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'anupam_portfolio',
      });
      // Remove temp file
      fs.unlinkSync(file.path);
      return result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error, falling back to local file:', error.message);
    }
  }

  // Fallback to local server URL
  const filename = path.basename(file.path);
  return `${hostUrl}/uploads/${filename}`;
};

module.exports = {
  upload,
  uploadToCloudinaryOrLocal,
  isCloudinaryConfigured,
};
