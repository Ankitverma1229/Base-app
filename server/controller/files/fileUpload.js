import fileUploadSchema from "../../models/fileUploadSchema.js";
import path from "path";
import cloudinary from "cloudinary";

export const localFileUpload = async (req, res) => {
  try {
    const file = req.files.localFile;
    console.log("Files received:", file);

    const uploadDir = path.join("controllers/files");
    const filePath = path.join(
      uploadDir,
      Date.now() + `.${file.name.split(".")[1]}`
    );
    file.mv(filePath, (err) => {
      console.log(err);
    });
    res.status(201).json({ message: "File uploaded" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const fileName = file.name;
  const options = {
    folder,
    resource_type: "auto",
    filename_override: fileName,
  };

  return await cloudinary.v2.uploader.upload(file.tempFilePath, options);
}

export const excelUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log(file);
    const supportedTypes = ["xls", "xlsx"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        error: "File type is not supported. Please upload an Excel file.",
      });
    }

    const response = await uploadFileToCloudinary(file, "Cloudinary");

    const fileData = await fileUploadSchema.create({
      name: file.name,
      fileUrl: response.secure_url,
    });

    res
      .status(200)
      .json({ message: "File uploaded to Successfully", fileData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error, unable to upload file" });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const response = await fileUploadSchema.find();
    if (response) {
      res.status(200).json({ message: "Success", response });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
