import cloudinary from "cloudinary";
export const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("cloudinary Connected");
  } catch (error) {
    console.log(error);
  }
};
