const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectsController');
const { protect } = require('../middleware/auth');

router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);

// Admin protected routes
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
