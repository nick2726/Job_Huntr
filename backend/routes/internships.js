const express = require('express');
const {
  getInternships,
  getInternship,
  createInternship,
  updateInternship,
  deleteInternship,
  getRecommendations
} = require('../controllers/internshipController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/recommendations', protect, getRecommendations);

router
  .route('/')
  .get(getInternships)
  .post(protect, authorize('admin'), createInternship);

router
  .route('/:id')
  .get(getInternship)
  .put(protect, authorize('admin'), updateInternship)
  .delete(protect, authorize('admin'), deleteInternship);

module.exports = router;
