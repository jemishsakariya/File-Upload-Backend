const File = require("../models/File");

// it upload files on your server
exports.localFileUpload = async (req, res) => {
  try {
    // fetch the file
    // .file = is passed in postman api in Body>form-data> file -> Value
    const file = req.files.file;
    // console.log("file: ", file);

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

// it upload files on cloudinary server
exports.imageUpload = async (req, res) => {};

// it upload files on cloudinary server
exports.videoUpload = async (req, res) => {};

// it upload files on cloudinary server
exports.imageReducerUpload = async (req, res) => {};
