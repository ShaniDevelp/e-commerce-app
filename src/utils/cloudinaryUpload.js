const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

const uploadImage = async (imagePath) => {

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath);
        console.log(result);
        return result.secure_url;
    } catch (error) {
        console.error(error);
    }
};

module.exports = uploadImage;

