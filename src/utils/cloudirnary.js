import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//here localfilepath means the path inn which multer stored the file in the server temporarily
//here we are saving in ./public/temp path
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", //auto will detect the type of file automatically
    });

    //once uploaded we can delete the locally the stored file
    fs.unlinkSync(localFilePath);

    //file is uploaded successfully
    console.log("File uploaded on cloudinary");
    console.log("The url of the uploaded file is: ", response.url);
    return response;
  } catch {
    fs.unlinkSync(localFilePath); // remove the locally saved temporarily file as the upload operation got failed
  }
};

export { uploadOnCloudinary };
