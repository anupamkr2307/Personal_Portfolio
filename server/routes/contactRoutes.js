const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimit');

router.post('/', contactLimiter, submitContactForm);

// Protected Admin message management
router.get('/', protect, getMessages);
router.put('/:id', protect, updateMessageStatus);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
