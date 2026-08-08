const express = require('express');
const {
  getBookmarks,
  addBookmark,
  removeBookmark
} = require('../controllers/bookmarkController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All bookmark routes require authentication

router.route('/')
  .get(getBookmarks);

router.route('/:id')
  .post(addBookmark)
  .delete(removeBookmark);

module.exports = router;
