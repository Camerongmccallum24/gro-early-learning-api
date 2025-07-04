const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const Company = require('../models/Company');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Email = require('../utils/email');

exports.getAllApplications = catchAsync(async (req, res, next) => {
  let filter = {};

  // Filter based on user role
  if (req.user.role === 'recruiter') {
    // Get jobs from recruiter's company
    const jobs = await Job.find({ company: req.user.profile.company }).select('_id');
    const jobIds = jobs.map(job => job._id);
    filter.job = { $in: jobIds };
  } else if (req.user.role === 'candidate') {
    filter.candidate = req.user._id;
  }
  // Admin can see all applications (no filter)

  const features = new APIFeatures(
    Application.find(filter)
      .populate('job', 'title company location employment.type')
      .populate('candidate', 'profile.firstName profile.lastName profile.avatar profile.email')
      .populate('job.company', 'name logo'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const applications = await features.query;
  const totalApplications = await Application.countDocuments(filter);

  res.status(200).json({
    status: 'success',
    results: applications.length,
    totalResults: totalApplications,
    data: {
      applications,
    },
  });
});

exports.getApplication = catchAsync(async (req, res, next) => {
  const application = await Application.findById(req.params.id)
    .populate('job')
    .populate('candidate')
    .populate('timeline.updatedBy', 'profile.firstName profile.lastName')
    .populate('notes.createdBy', 'profile.firstName profile.lastName')
    .populate('interviews.interviewers.interviewer', 'profile.firstName profile.lastName profile.avatar');

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  // Check if user can view this application
  if (req.user.role === 'candidate' && application.candidate._id.toString() !== req.user._id.toString()) {
    return next(new AppError('You can only view your own applications', 403));
  }

  if (req.user.role === 'recruiter') {
    const job = await Job.findById(application.job._id);
    if (job.company.toString() !== req.user.profile.company.toString()) {
      return next(new AppError('You can only view applications for jobs from your company', 403));
    }
  }

  res.status(200).json({
    status: 'success',
    data: {
      application,
    },
  });
});

exports.createApplication = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;
  const { coverLetter, questionnaire } = req.body;

  // Check if job exists and is active
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new AppError('Job not found', 404));
  }

  if (!job.canApply()) {
    return next(new AppError('This job is no longer accepting applications', 400));
  }

  // Check if user already applied
  const existingApplication = await Application.findOne({
    job: jobId,
    candidate: req.user._id,
  });

  if (existingApplication) {
    return next(new AppError('You have already applied for this job', 400));
  }

  // Check if user is a candidate
  if (req.user.role !== 'candidate') {
    return next(new AppError('Only candidates can apply for jobs', 403));
  }

  // Create application data
  const applicationData = {
    job: jobId,
    candidate: req.user._id,
    coverLetter,
    questionnaire,
    source: req.body.source || 'website',
  };

  // Handle resume upload if file is provided
  if (req.file) {
    applicationData.documents = {
      resume: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
      },
    };
  } else if (req.user.profile.resume) {
    // Use user's profile resume if no new file uploaded
    applicationData.documents = {
      resume: req.user.profile.resume,
    };
  }
  // Note: Temporarily allowing applications without resume for basic flow testing
  // TODO: Re-enable resume requirement once file upload is implemented

  const application = await Application.create(applicationData);

  // Update job application count
  await job.updateApplicationStats(1);

  // Update company stats
  await Company.findByIdAndUpdate(job.company, {
    $inc: { 'stats.totalApplications': 1 }
  });

  // Send confirmation email to candidate
  try {
    await new Email(req.user, null).sendApplicationConfirmation(job.title);
  } catch (err) {
    console.log('Email sending failed:', err.message);
  }

  // Populate the response
  const populatedApplication = await Application.findById(application._id)
    .populate('job', 'title company')
    .populate('candidate', 'profile.firstName profile.lastName');

  res.status(201).json({
    status: 'success',
    data: {
      application: populatedApplication,
    },
  });
});

exports.updateApplicationStatus = catchAsync(async (req, res, next) => {
  const { status, notes } = req.body;

  const application = await Application.findById(req.params.id)
    .populate('job')
    .populate('candidate');

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  // Check if user can update this application
  if (req.user.role === 'recruiter') {
    const job = await Job.findById(application.job._id);
    if (job.company.toString() !== req.user.profile.company.toString()) {
      return next(new AppError('You can only update applications for jobs from your company', 403));
    }
  } else if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to update application status', 403));
  }

  // Update application
  await application.updateStatus(status, notes, req.user._id);

  // Send status update email to candidate
  try {
    await new Email(application.candidate, null).sendApplicationStatusUpdate(
      application.job.title,
      status
    );
  } catch (err) {
    console.log('Email sending failed:', err.message);
  }

  res.status(200).json({
    status: 'success',
    data: {
      application,
    },
  });
});

exports.addApplicationNote = catchAsync(async (req, res, next) => {
  const { content, isPrivate, tags } = req.body;

  const application = await Application.findById(req.params.id);

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  // Check if user can add notes to this application
  if (req.user.role === 'recruiter') {
    const job = await Job.findById(application.job);
    if (job.company.toString() !== req.user.profile.company.toString()) {
      return next(new AppError('You can only add notes to applications for jobs from your company', 403));
    }
  } else if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to add notes to this application', 403));
  }

  await application.addNote(content, req.user._id, isPrivate, tags);

  res.status(200).json({
    status: 'success',
    data: {
      application,
    },
  });
});

exports.scheduleInterview = catchAsync(async (req, res, next) => {
  const {
    type,
    scheduledDate,
    duration,
    location,
    meetingLink,
    interviewers,
    notes
  } = req.body;

  const application = await Application.findById(req.params.id)
    .populate('candidate')
    .populate('job');

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  // Check if user can schedule interview for this application
  if (req.user.role === 'recruiter') {
    const job = await Job.findById(application.job._id);
    if (job.company.toString() !== req.user.profile.company.toString()) {
      return next(new AppError('You can only schedule interviews for applications from your company', 403));
    }
  } else if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to schedule interviews', 403));
  }

  const interviewData = {
    type,
    scheduledDate: new Date(scheduledDate),
    duration,
    location,
    meetingLink,
    interviewers: interviewers || [{ interviewer: req.user._id, isPrimary: true }],
    notes
  };

  await application.scheduleInterview(interviewData);

  // Send interview invitation email
  try {
    await new Email(application.candidate, null).sendInterviewInvitation(
      application.job.title,
      type,
      scheduledDate,
      location || meetingLink
    );
  } catch (err) {
    console.log('Email sending failed:', err.message);
  }

  res.status(200).json({
    status: 'success',
    data: {
      application,
    },
  });
});

exports.submitInterviewFeedback = catchAsync(async (req, res, next) => {
  const { interviewIndex } = req.params;
  const feedback = req.body;

  const application = await Application.findById(req.params.id);

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  const interview = application.interviews[interviewIndex];
  if (!interview) {
    return next(new AppError('Interview not found', 404));
  }

  // Check if user is an interviewer for this interview
  const isInterviewer = interview.interviewers.some(
    int => int.interviewer.toString() === req.user._id.toString()
  );

  if (!isInterviewer && req.user.role !== 'admin') {
    return next(new AppError('You can only submit feedback for interviews you are conducting', 403));
  }

  await application.submitFeedback(interviewIndex, feedback, req.user._id);

  res.status(200).json({
    status: 'success',
    data: {
      application,
    },
  });
});

exports.withdrawApplication = catchAsync(async (req, res, next) => {
  const { reason } = req.body;

  const application = await Application.findById(req.params.id)
    .populate('job', 'title');

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  // Only candidate can withdraw their own application
  if (application.candidate.toString() !== req.user._id.toString()) {
    return next(new AppError('You can only withdraw your own applications', 403));
  }

  // Check if application can be withdrawn
  if (['hired', 'rejected', 'withdrawn'].includes(application.status)) {
    return next(new AppError('This application cannot be withdrawn', 400));
  }

  application.status = 'withdrawn';
  application.withdrawnAt = new Date();
  application.withdrawalReason = reason;
  application.isActive = false;

  application.timeline.push({
    status: 'withdrawn',
    date: new Date(),
    notes: reason,
    updatedBy: req.user._id,
  });

  await application.save();

  res.status(200).json({
    status: 'success',
    message: 'Application withdrawn successfully',
  });
});

exports.getApplicationStats = catchAsync(async (req, res, next) => {
  let matchFilter = {};

  // Filter based on user role
  if (req.user.role === 'recruiter') {
    const jobs = await Job.find({ company: req.user.profile.company }).select('_id');
    const jobIds = jobs.map(job => job._id);
    matchFilter.job = { $in: jobIds };
  } else if (req.user.role === 'candidate') {
    matchFilter.candidate = req.user._id;
  }

  const stats = await Application.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        avgScore: { $avg: '$screening.score' }
      }
    },
    { $sort: { count: -1 } }
  ]);

  const timelineStats = await Application.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: null,
        avgTimeToHire: { $avg: '$analytics.timeMetrics.totalProcessTime' },
        totalApplications: { $sum: 1 }
      }
    }
  ]);

  const monthlyTrend = await Application.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 12 }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      statusBreakdown: stats,
      overview: timelineStats[0] || { avgTimeToHire: 0, totalApplications: 0 },
      monthlyTrend,
    },
  });
});

exports.bulkUpdateApplications = catchAsync(async (req, res, next) => {
  const { applicationIds, status, notes } = req.body;

  if (!Array.isArray(applicationIds) || applicationIds.length === 0) {
    return next(new AppError('Application IDs array is required', 400));
  }

  // Find all applications
  const applications = await Application.find({
    _id: { $in: applicationIds }
  }).populate('job');

  if (applications.length === 0) {
    return next(new AppError('No applications found', 404));
  }

  // Check permissions for each application
  if (req.user.role === 'recruiter') {
    for (const application of applications) {
      const job = await Job.findById(application.job._id);
      if (job.company.toString() !== req.user.profile.company.toString()) {
        return next(new AppError('You can only update applications for jobs from your company', 403));
      }
    }
  } else if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to bulk update applications', 403));
  }

  // Update all applications
  const updatePromises = applications.map(application =>
    application.updateStatus(status, notes, req.user._id)
  );

  await Promise.all(updatePromises);

  res.status(200).json({
    status: 'success',
    message: `Successfully updated ${applications.length} applications`,
  });
});

exports.exportApplications = catchAsync(async (req, res, next) => {
  let filter = {};

  // Filter based on user role
  if (req.user.role === 'recruiter') {
    const jobs = await Job.find({ company: req.user.profile.company }).select('_id');
    const jobIds = jobs.map(job => job._id);
    filter.job = { $in: jobIds };
  } else if (req.user.role === 'candidate') {
    return next(new AppError('Candidates cannot export applications', 403));
  }

  const applications = await Application.find(filter)
    .populate('job', 'title company')
    .populate('candidate', 'profile.firstName profile.lastName profile.email profile.phone')
    .select('applicationId status createdAt screening.score timeline')
    .lean();

  // Format data for export
  const exportData = applications.map(app => ({
    'Application ID': app.applicationId,
    'Job Title': app.job?.title || 'N/A',
    'Candidate Name': `${app.candidate?.profile?.firstName || ''} ${app.candidate?.profile?.lastName || ''}`.trim(),
    'Email': app.candidate?.profile?.email || 'N/A',
    'Phone': app.candidate?.profile?.phone || 'N/A',
    'Status': app.status,
    'Score': app.screening?.score || 'N/A',
    'Applied Date': app.createdAt?.toISOString().split('T')[0] || 'N/A',
    'Current Stage': app.timeline?.length > 0 ? app.timeline[app.timeline.length - 1].status : 'N/A'
  }));

  res.status(200).json({
    status: 'success',
    results: exportData.length,
    data: {
      applications: exportData,
    },
  });
}); 