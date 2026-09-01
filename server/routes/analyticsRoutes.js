const express = require('express');
const router = express.Router();
const { getAnalyticsStats, trackManualPageView } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.get('/stats', protect, getAnalyticsStats);
router.post('/track', trackManualPageView);

module.exports = router;
