const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'audiofiles',
        resource_type: "auto",
		allowed_formats: 'mp3, m4a, wav',
        use_filename: true,
        unique_filename: true,
        // return_delete_token: true
	}
});

// const fileUploader = multer({ storage });
// module.exports = { fileUploader, cloudinary};

module.exports = multer({ storage });
