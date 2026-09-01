const express = require('express');
const router = express.Router();
const {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require('../controllers/achievementsController');
const { protect } = require('../middleware/auth');

router.get('/', getAchievements);
router.post('/', protect, createAchievement);
router.put('/:id', protect, updateAchievement);
router.delete('/:id', protect, deleteAchievement);

module.exports = router;
