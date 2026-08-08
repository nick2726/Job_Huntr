const Internship = require('../models/Internship');

// @desc    Get all internships (with filtering and search)
// @route   GET /api/internships
// @access  Public
exports.getInternships = async (req, res) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    // Fields to exclude from direct match
    const removeFields = ['select', 'sort', 'page', 'limit', 'keyword'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Handle companyType filtering via Company model lookup
    let companyIds = [];
    if (req.query.companyType) {
      const Company = require('../models/Company');
      const companies = await Company.find({ companyType: req.query.companyType });
      companyIds = companies.map(c => c._id);
      reqQuery.companyId = { $in: companyIds };
      delete reqQuery.companyType;
    }

    // Handle stringified operators ($gt, $gte, etc)
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Internship.find(JSON.parse(queryStr)).populate({
      path: 'companyId',
      select: 'companyName logo location industry companyType'
    });

    // Keyword search (title or description)
    if (req.query.keyword) {
      const keyword = req.query.keyword;
      query = query.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
          { skills: { $regex: keyword, $options: 'i' } }
        ]
      });
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-postedDate');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Internship.countDocuments(query);

    query = query.skip(startIndex).limit(limit);

    const internships = await query;

    // Pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: internships.length,
      pagination,
      data: internships
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get single internship
// @route   GET /api/internships/:id
// @access  Public
exports.getInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate({
      path: 'companyId',
      select: 'companyName logo website description location industry'
    });
    if (!internship) {
      return res.status(404).json({ success: false, error: 'Internship not found' });
    }
    res.status(200).json({ success: true, data: internship });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Create new internship
// @route   POST /api/internships
// @access  Private (Admin)
exports.createInternship = async (req, res) => {
  try {
    const internship = await Internship.create(req.body);
    res.status(201).json({ success: true, data: internship });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update internship
// @route   PUT /api/internships/:id
// @access  Private (Admin)
exports.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!internship) {
      return res.status(404).json({ success: false, error: 'Internship not found' });
    }
    res.status(200).json({ success: true, data: internship });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete internship
// @route   DELETE /api/internships/:id
// @access  Private (Admin)
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      return res.status(404).json({ success: false, error: 'Internship not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get internship recommendations based on skills
// @route   GET /api/internships/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.skills || user.skills.length === 0) {
      // Return recent jobs if no skills
      const internships = await Internship.find()
        .sort('-postedDate')
        .limit(5)
        .populate('companyId', 'companyName logo');
      return res.status(200).json({ success: true, data: internships });
    }

    // Find jobs matching user's skills
    const internships = await Internship.find({
      skills: { $in: user.skills }
    })
      .sort('-postedDate')
      .limit(5)
      .populate('companyId', 'companyName logo');

    res.status(200).json({ success: true, data: internships });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
