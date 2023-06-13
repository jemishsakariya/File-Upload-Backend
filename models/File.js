const mongoose = require("mongoose");

// const nodemailer = require("nodemailer");
const transporter = require("../config/transporter");

const mailTemplate = require("../Template/mailTemplate");

const fileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
});

// post middleware
// doc => when you send req and you store something in your Mongodb it is the doc argument
fileSchema.post("save", async function (doc) {
  try {
    // console.log("Doc: ", doc);

    // transporter
    // transporter => imported with external file

    // mail send
    let info = await transporter.sendMail({
      from: "Testing",
      to: doc.email,
      subject: "New File Uploaded on Cloudinary",
      html: mailTemplate(doc),
      // html: `<h2>Hello</h2></br><p>File Uploaded</p>`,
    });

    console.log("Info: ", info);
  } catch (error) {
    console.error(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
