const multer = require('multer');
const asyncHandler = require('express-async-handler');
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'public', 'uploads')); // Files will be stored in the "uploads" directory
  },
  filename: (req, file, cb) => {
    const animal_id = req.params.id;
    cb(null, animal_id); // Unique filename
  },
});

const fileFilter = (req, file, cb) => {
  // Check if the file type is jpg

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only JPG files are allowed!'), false); // Reject the file
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

exports.handleUpload = asyncHandler(async (req, res, next) => {
  // Use the upload.single middleware to handle a single file upload
  upload.single('image')(req, res, (err) => {
    // Check if there's an error during the file upload
    if (err) {
      // Handle the error (you can add more specific error handling if needed)
      console.error('Error during file upload:', err.message);
      return res.status(500).send(err.message);
    }

    // At this point, the file has been uploaded successfully
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // You can use req.file.path to get the path of the uploaded file
    const filePath = req.file.path;

    // Respond with a success message or perform additional actions
    console.log(`File uploaded successfully! Path: ${filePath}`);
    res.redirect(`/animals/${req.params.id}`);
  });
});


