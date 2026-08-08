const User = require('../models/User');

// @desc    Upload resume
// @route   POST /api/users/resume
// @access  Private
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { resumeUrl: `/uploads/${req.file.filename}` },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
