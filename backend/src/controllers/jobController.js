const Job = require('../models/Job');
const Company = require('../models/Company');
const Application = require('../models/Application');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllJobs = catchAsync(async (req, res, next) => {
  // Build filter object
  let filter = { status: 'active' };
  
  // Add additional filters based on query parameters
  if (req.query.company) filter.company = req.query.company;
  if (req.query.employmentType) filter['employment.type'] = req.query.employmentType;
  if (req.query.experienceLevel) filter['experience.level'] = req.query.experienceLevel;
  if (req.query.locationType) filter['location.type'] = req.query.locationType;
  
  // Skills filter
  if (req.query.skills) {
    const skills = req.query.skills.split(',');
    filter['skills.required.name'] = { $in: skills };
  }
  
  // Location filter
  if (req.query.location && req.query.location !== 'remote') {
    filter.$or = [
      { 'location.city': new RegExp(req.query.location, 'i') },
      { 'location.state': new RegExp(req.query.location, 'i') },
      { 'location.type': 'remote' }
    ];
  }
  
  // Salary range filter
  if (req.query.minSalary || req.query.maxSalary) {
    filter.salary = {};
    if (req.query.minSalary) filter.salary.min = { $gte: parseInt(req.query.minSalary) };
    if (req.query.maxSalary) filter.salary.max = { $lte: parseInt(req.query.maxSalary) };
  }

  // EXECUTE QUERY
  const features = new APIFeatures(
    Job.find(filter).populate('company', 'name logo location industry').populate('recruiter', 'profile.firstName profile.lastName'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const jobs = await features.query;

  // Get total count for pagination
  const totalJobs = await Job.countDocuments(filter);

  res.status(200).json({
    status: 'success',
    results: jobs.length,
    totalResults: totalJobs,
    data: {
      jobs,
    },
  });
});

exports.getJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id)
    .populate('company')
    .populate('recruiter', 'profile.firstName profile.lastName profile.avatar');

  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }

  // Increment view count if it's not the recruiter viewing
  if (!req.user || req.user._id.toString() !== job.recruiter._id.toString()) {
    await job.incrementViews();
  }

  // Check if current user has applied (if logged in)
  let hasApplied = false;
  if (req.user && req.user.role === 'candidate') {
    const application = await Application.findOne({
      job: job._id,
      candidate: req.user._id,
    });
    hasApplied = !!application;
  }

  res.status(200).json({
    status: 'success',
    data: {
      job,
      hasApplied,
    },
  });
});

exports.createJob = catchAsync(async (req, res, next) => {
  // Ensure user can only create jobs for their company
  if (req.user.role === 'recruiter' && req.user.profile.company) {
    req.body.company = req.user.profile.company;
  }
  
  req.body.recruiter = req.user._id;

  const newJob = await Job.create(req.body);

  // Update company stats
  await Company.findByIdAndUpdate(req.body.company, {
    $inc: { 'stats.totalJobs': 1 }
  });

  const populatedJob = await Job.findById(newJob._id)
    .populate('company', 'name logo')
    .populate('recruiter', 'profile.firstName profile.lastName');

  res.status(201).json({
    status: 'success',
    data: {
      job: populatedJob,
    },
  });
});

exports.updateJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }

  // Check if user can edit this job
  if (req.user.role === 'recruiter') {
    if (job.recruiter.toString() !== req.user._id.toString() && 
        job.company.toString() !== req.user.profile.company.toString()) {
      return next(new AppError('You can only edit jobs from your company', 403));
    }
  }

  req.body.lastModifiedBy = req.user._id;

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('company', 'name logo').populate('recruiter', 'profile.firstName profile.lastName');

  res.status(200).json({
    status: 'success',
    data: {
      job: updatedJob,
    },
  });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }

  // Check if user can delete this job
  if (req.user.role === 'recruiter') {
    if (job.recruiter.toString() !== req.user._id.toString() && 
        job.company.toString() !== req.user.profile.company.toString()) {
      return next(new AppError('You can only delete jobs from your company', 403));
    }
  }

  await Job.findByIdAndDelete(req.params.id);

  // Update company stats
  await Company.findByIdAndUpdate(job.company, {
    $inc: { 'stats.totalJobs': -1 }
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMyJobs = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.user.role === 'recruiter') {
    filter.recruiter = req.user._id;
  } else if (req.user.role === 'admin') {
    // Admin can see all jobs
  } else {
    return next(new AppError('Only recruiters and admins can access this route', 403));
  }

  const features = new APIFeatures(
    Job.find(filter).populate('company', 'name logo'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const jobs = await features.query;

  res.status(200).json({
    status: 'success',
    results: jobs.length,
    data: {
      jobs,
    },
  });
});

exports.getJobApplications = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }

  // Check if user can view applications for this job
  if (req.user.role === 'recruiter') {
    if (job.recruiter.toString() !== req.user._id.toString() && 
        job.company.toString() !== req.user.profile.company.toString()) {
      return next(new AppError('You can only view applications for jobs from your company', 403));
    }
  }

  const features = new APIFeatures(
    Application.find({ job: req.params.id })
      .populate('candidate', 'profile.firstName profile.lastName profile.avatar profile.resume')
      .populate('job', 'title company'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const applications = await features.query;

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: {
      applications,
    },
  });
});

exports.updateJobStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }

  // Check if user can update this job
  if (req.user.role === 'recruiter') {
    if (job.recruiter.toString() !== req.user._id.toString() && 
        job.company.toString() !== req.user.profile.company.toString()) {
      return next(new AppError('You can only update jobs from your company', 403));
    }
  }

  const oldStatus = job.status;
  job.status = status;
  job.lastModifiedBy = req.user._id;

  // Update company stats based on status change
  if (oldStatus !== 'active' && status === 'active') {
    await Company.findByIdAndUpdate(job.company, {
      $inc: { 'stats.activeJobs': 1 }
    });
  } else if (oldStatus === 'active' && status !== 'active') {
    await Company.findByIdAndUpdate(job.company, {
      $inc: { 'stats.activeJobs': -1 }
    });
  }

  await job.save();

  res.status(200).json({
    status: 'success',
    data: {
      job,
    },
  });
});

exports.searchJobs = catchAsync(async (req, res, next) => {
  const { q, location, skills, experience, salary, type } = req.query;

  let searchFilter = { status: 'active' };

  // Text search
  if (q) {
    searchFilter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { 'skills.required.name': { $regex: q, $options: 'i' } },
    ];
  }

  // Location search
  if (location && location !== 'remote') {
    searchFilter.$and = searchFilter.$and || [];
    searchFilter.$and.push({
      $or: [
        { 'location.city': { $regex: location, $options: 'i' } },
        { 'location.state': { $regex: location, $options: 'i' } },
        { 'location.type': 'remote' },
      ],
    });
  }

  // Skills filter
  if (skills) {
    const skillArray = skills.split(',').map(skill => skill.trim());
    searchFilter['skills.required.name'] = { $in: skillArray };
  }

  // Experience filter
  if (experience) {
    searchFilter['experience.level'] = experience;
  }

  // Employment type filter
  if (type) {
    searchFilter['employment.type'] = type;
  }

  // Salary filter
  if (salary) {
    const salaryRange = salary.split('-');
    if (salaryRange.length === 2) {
      searchFilter.salary = {
        min: { $gte: parseInt(salaryRange[0]) },
        max: { $lte: parseInt(salaryRange[1]) },
      };
    }
  }

  const features = new APIFeatures(
    Job.find(searchFilter)
      .populate('company', 'name logo location industry')
      .populate('recruiter', 'profile.firstName profile.lastName'),
    req.query
  )
    .sort()
    .limitFields()
    .paginate();

  const jobs = await features.query;
  const totalResults = await Job.countDocuments(searchFilter);

  res.status(200).json({
    status: 'success',
    results: jobs.length,
    totalResults,
    data: {
      jobs,
    },
  });
});

exports.getJobStats = catchAsync(async (req, res, next) => {
  const stats = await Job.aggregate([
    {
      $match: { status: 'active' }
    },
    {
      $group: {
        _id: null,
        totalJobs: { $sum: 1 },
        avgSalaryMin: { $avg: '$salary.min' },
        avgSalaryMax: { $avg: '$salary.max' },
        totalViews: { $sum: '$stats.views' },
        totalApplications: { $sum: '$stats.applications' }
      }
    }
  ]);

  const jobsByType = await Job.aggregate([
    {
      $match: { status: 'active' }
    },
    {
      $group: {
        _id: '$employment.type',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);

  const jobsByLocation = await Job.aggregate([
    {
      $match: { status: 'active' }
    },
    {
      $group: {
        _id: '$location.type',
        count: { $sum: 1 }
      }
    }
  ]);

  const topSkills = await Job.getPopularSkills();

  res.status(200).json({
    status: 'success',
    data: {
      overall: stats[0] || {
        totalJobs: 0,
        avgSalaryMin: 0,
        avgSalaryMax: 0,
        totalViews: 0,
        totalApplications: 0
      },
      jobsByType,
      jobsByLocation,
      topSkills,
    },
  });
});

exports.getRecommendedJobs = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'candidate') {
    return next(new AppError('Only candidates can get job recommendations', 403));
  }

  const user = req.user;
  let recommendationFilter = { status: 'active' };

  // Filter by user skills
  if (user.profile.skills && user.profile.skills.length > 0) {
    const userSkills = user.profile.skills.map(skill => skill.name);
    recommendationFilter['skills.required.name'] = { $in: userSkills };
  }

  // Filter by user preferences
  if (user.preferences) {
    if (user.preferences.jobTypes && user.preferences.jobTypes.length > 0) {
      recommendationFilter['employment.type'] = { $in: user.preferences.jobTypes };
    }

    if (user.preferences.workLocation && user.preferences.workLocation.length > 0) {
      recommendationFilter['location.type'] = { $in: user.preferences.workLocation };
    }

    if (user.preferences.locations && user.preferences.locations.length > 0) {
      recommendationFilter.$or = [
        { 'location.city': { $in: user.preferences.locations } },
        { 'location.type': 'remote' }
      ];
    }
  }

  // Filter by experience level
  if (user.profile.experience && user.profile.experience.length > 0) {
    const totalExperience = user.profile.experience.reduce((total, exp) => {
      if (exp.isCurrent) {
        return total + ((new Date() - new Date(exp.startDate)) / (365.25 * 24 * 60 * 60 * 1000));
      } else if (exp.endDate) {
        return total + ((new Date(exp.endDate) - new Date(exp.startDate)) / (365.25 * 24 * 60 * 60 * 1000));
      }
      return total;
    }, 0);

    let experienceLevel;
    if (totalExperience < 2) experienceLevel = ['entry', 'junior'];
    else if (totalExperience < 5) experienceLevel = ['junior', 'mid'];
    else if (totalExperience < 10) experienceLevel = ['mid', 'senior'];
    else experienceLevel = ['senior', 'lead', 'principal'];

    recommendationFilter['experience.level'] = { $in: experienceLevel };
  }

  const jobs = await Job.find(recommendationFilter)
    .populate('company', 'name logo location industry')
    .sort({ createdAt: -1 })
    .limit(20);

  res.status(200).json({
    status: 'success',
    results: jobs.length,
    data: {
      jobs,
    },
  });
}); 