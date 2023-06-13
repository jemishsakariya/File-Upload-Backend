const File = require("../models/File");

const cloudinary = require("cloudinary").v2;

// it upload files on your server
exports.localFileUpload = async (req, res) => {
  try {
    // fetch the file
    // .file = is passed in postman api in Body>form-data> file -> Value
    const file = req.files.file;
    console.log("file: ", file);

    // where you wanna store
    // "__dirname" => "current directory (Controller)"
    // path = current_dir + folder + name + extention
    const path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    // console.log("path: ", path);

    file.mv(path, (err) => {
      console.log(err);
    });

    res.status(200).json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// it upload files on cloudinary server
exports.imageUpload = async (req, res) => {
  try {
    // data fetch
    const { name, tags, email } = req.body;

    const file = req.files.imageFile;
    // console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type is not supported",
      });
    }

    // File format supported
    const response = await uploadFileToCloudinary(file, "fileUpload");
    // console.log(response);
    // db save entry
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "Video Successfully Uploaded",
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// it upload files on cloudinary server
exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;

    const file = req.files.videoFile;

    const supportedTypes = ["mp4", "mkv", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type is not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "fileUpload");

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "Video Successfully Uploaded",
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// it upload files on cloudinary server
exports.imageReducerUpload = async (req, res) => {};
