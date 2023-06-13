## File Upload and Image Compression API

This project is a backend API built using Express.js that allows users to upload various file types, including images and videos, to a server and Cloudinary. It also provides an endpoint for compressing and reducing the size of images.

### Features:
- File upload functionality for images and videos
- Integration with Cloudinary for storing and managing files
- API endpoint for compressing and reducing the size of images
- Error handling and validation for file uploads
- Configurable settings for Cloudinary integration and compression

### Technologies Used:
- Express.js: Fast and minimalist web framework for Node.js
- express-fileupload: Middleware for handling file uploads in Express.js
- Cloudinary: Cloud-based media management platform for storing and transforming files

### Getting Started:
1. Clone the repository: `git clone [repository URL]`
2. Install dependencies: `npm install`
3. Configure the MongoDB connection & PORT in the `.env` file.
4. Start the server: `npm start` \
&emsp; &emsp;&emsp; OR
4. Start the nodemon server: `npm run dev`