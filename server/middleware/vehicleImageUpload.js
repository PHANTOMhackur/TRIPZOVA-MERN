const multer = require('multer');

const allowedMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp'
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      const error = new Error('Only JPG, PNG and WEBP vehicle photos are allowed.');
      error.status = 400;
      return callback(error);
    }

    return callback(null, true);
  }
}).single('image');

function vehicleImageUpload(req, res, next) {
  upload(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Vehicle photo must be 5 MB or smaller.'
      });
    }

    return res.status(error.status || 400).json({
      success: false,
      message: error.message || 'Unable to read the uploaded image.'
    });
  });
}

module.exports = vehicleImageUpload;
