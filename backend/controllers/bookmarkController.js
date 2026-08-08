const User = require('../models/User');
const Internship = require('../models/Internship');

// @desc    Get user's bookmarked internships
// @route   GET /api/bookmarks
// @access  Private (Student)
exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedInternships',
      populate: {
        path: 'companyId',
        select: 'companyName logo location industry'
      }
    });

    res.status(200).json({ success: true, count: user.savedInternships.length, data: user.savedInternships });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Add bookmark
// @route   POST /api/bookmarks/:id
// @access  Private (Student)
exports.addBookmark = async (req, res) => {
  try {
    const internshipId = req.params.id;
    
    // Check if internship exists
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ success: false, error: 'Internship not found' });
    }

    const user = await User.findById(req.user.id);

    if (user.savedInternships.includes(internshipId)) {
      return res.status(400).json({ success: false, error: 'Internship already bookmarked' });
    }

    user.savedInternships.push(internshipId);
    await user.save();

    res.status(200).json({ success: true, data: user.savedInternships });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Remove bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private (Student)
exports.removeBookmark = async (req, res) => {
  try {
    const internshipId = req.params.id;
    const user = await User.findById(req.user.id);

    user.savedInternships = user.savedInternships.filter(id => id.toString() !== internshipId);
    await user.save();

    res.status(200).json({ success: true, data: user.savedInternships });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
