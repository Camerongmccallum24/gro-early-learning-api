const express = require('express');
const jobController = require('../controllers/jobController');
const { protect, restrictTo, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes (no authentication required)
router.get('/', optionalAuth, jobController.getAllJobs);
router.get('/search', optionalAuth, jobController.searchJobs);
router.get('/stats', jobController.getJobStats);
router.get('/:id', optionalAuth, jobController.getJob);

// Protected routes (authentication required)
router.use(protect);

// Candidate routes
router.get('/recommended/for-me', restrictTo('candidate'), jobController.getRecommendedJobs);

// Recruiter and Admin routes
router.get('/my/jobs', restrictTo('recruiter', 'admin'), jobController.getMyJobs);

// Create job (recruiter, admin)
router.post('/', restrictTo('recruiter', 'admin'), jobController.createJob);

// Job management routes
router
  .route('/:id')
  .patch(restrictTo('recruiter', 'admin'), jobController.updateJob)
  .delete(restrictTo('recruiter', 'admin'), jobController.deleteJob);

// Job status management
router.patch('/:id/status', restrictTo('recruiter', 'admin'), jobController.updateJobStatus);

// Application management for specific job
router.get('/:id/applications', restrictTo('recruiter', 'admin'), jobController.getJobApplications);

module.exports = router; 