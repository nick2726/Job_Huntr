const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadResume } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Setup Multer Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, `resume-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  const filetypes = /pdf|doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Resumes only! (PDF, DOC, DOCX)');
  }
}

router.post('/resume', protect, upload.single('resume'), uploadResume);

module.exports = router;
