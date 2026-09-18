const {
  cloudinary,
  configureCloudinary,
  hasCloudinaryConfig
} = require('../config/cloudinary');

function uploadBuffer(buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      }
    );

    stream.end(buffer);
  });
}

async function uploadVehicleImage(req, res) {
  try {
    if (req.user.role !== 'partner') {
      return res.status(403).json({
        success: false,
        message: 'Only partners can upload vehicle photos.'
      });
    }

    if (req.user.partnerStatus !== 'approved') {
      return res.status(403).json({
        success: false,
        message: 'Your partner account must be approved before uploading vehicle photos.'
      });
    }

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: 'Please choose a vehicle photo.'
      });
    }

    if (!hasCloudinaryConfig() || !configureCloudinary()) {
      return res.status(503).json({
        success: false,
        message: 'Vehicle image storage is not configured yet. Add the Cloudinary environment variables on the server.'
      });
    }

    const folder = process.env.CLOUDINARY_VEHICLE_FOLDER || 'tripzova/vehicles';

    const result = await uploadBuffer(req.file.buffer, {
      folder,
      resource_type: 'image',
      use_filename: false,
      unique_filename: true,
      overwrite: false,
      transformation: [
        {
          width: 1600,
          height: 1200,
          crop: 'limit',
          quality: 'auto'
        }
      ]
    });

    return res.status(201).json({
      success: true,
      message: 'Vehicle photo uploaded successfully.',
      url: result.secure_url,
      secureUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    });
  } catch (error) {
    console.error('Vehicle image upload error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to upload the vehicle photo right now.'
    });
  }
}

module.exports = {
  uploadVehicleImage
};
