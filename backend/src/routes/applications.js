const express = require('express');
const applicationController = require('../controllers/applicationController');
const { protect, restrictTo } = require('../middleware/auth');
const { resumeUpload, applicationUpload, processFiles } = require('../middleware/upload');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all applications (filtered by user role)
router.get('/', applicationController.getAllApplications);

// Get application statistics
router.get('/stats', applicationController.getApplicationStats);

// Export applications (recruiters and admins only)
router.get('/export', restrictTo('recruiter', 'admin'), applicationController.exportApplications);

// Apply for a job (candidates only)
router.post('/jobs/:jobId/apply', 
  restrictTo('candidate'),
  resumeUpload,
  processFiles,
  applicationController.createApplication
);

// Bulk update applications (recruiters and admins only)
router.patch('/bulk-update', 
  restrictTo('recruiter', 'admin'), 
  applicationController.bulkUpdateApplications
);

// Individual application routes
router
  .route('/:id')
  .get(applicationController.getApplication);

// Update application status (recruiters and admins only)
router.patch('/:id/status', 
  restrictTo('recruiter', 'admin'), 
  applicationController.updateApplicationStatus
);

// Add notes to application (recruiters and admins only)
router.post('/:id/notes', 
  restrictTo('recruiter', 'admin'), 
  applicationController.addApplicationNote
);

// Schedule interview (recruiters and admins only)
router.post('/:id/interviews', 
  restrictTo('recruiter', 'admin'), 
  applicationController.scheduleInterview
);

// Submit interview feedback (recruiters and admins only)
router.post('/:id/interviews/:interviewIndex/feedback', 
  restrictTo('recruiter', 'admin'), 
  applicationController.submitInterviewFeedback
);

// Withdraw application (candidates only)
router.patch('/:id/withdraw', 
  restrictTo('candidate'), 
  applicationController.withdrawApplication
);

module.exports = router; 