const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    index: true,
    maxlength: [100, 'Job title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  summary: {
    type: String,
    maxlength: [500, 'Summary cannot exceed 500 characters']
  },
  requirements: [{
    type: String,
    trim: true
  }],
  responsibilities: [{
    type: String,
    trim: true
  }],
  qualifications: [{
    type: String,
    trim: true
  }],
  skills: {
    required: [{
      name: { type: String, required: true },
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'intermediate'
      },
      priority: {
        type: String,
        enum: ['must-have', 'nice-to-have'],
        default: 'must-have'
      }
    }],
    preferred: [{
      name: String,
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert']
      }
    }]
  },
  experience: {
    min: {
      type: Number,
      min: 0,
      default: 0
    },
    max: {
      type: Number,
      min: 0
    },
    level: {
      type: String,
      enum: ['entry', 'junior', 'mid', 'senior', 'lead', 'principal', 'executive'],
      required: true
    }
  },
  education: {
    level: {
      type: String,
      enum: ['high-school', 'associate', 'bachelor', 'master', 'phd', 'none'],
      default: 'bachelor'
    },
    field: String,
    required: { type: Boolean, default: false }
  },
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' },
    period: {
      type: String,
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'yearly'
    },
    isNegotiable: { type: Boolean, default: true },
    showRange: { type: Boolean, default: true }
  },
  benefits: [{
    category: {
      type: String,
      enum: ['health', 'retirement', 'time-off', 'learning', 'wellness', 'financial', 'other']
    },
    name: String,
    description: String
  }],
  location: {
    type: {
      type: String,
      enum: ['onsite', 'remote', 'hybrid'],
      required: true
    },
    city: String,
    state: String,
    country: String,
    zipCode: String,
    timezone: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    remoteRestrictions: {
      countries: [String],
      states: [String],
      timezones: [String]
    }
  },
  employment: {
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship', 'temporary'],
      required: true,
      index: true
    },
    duration: String, // for contracts/internships
    hoursPerWeek: Number,
    schedule: {
      type: String,
      enum: ['standard', 'flexible', 'shift-work', 'on-call']
    }
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  department: {
    type: String,
    trim: true
  },
  team: {
    type: String,
    trim: true
  },
  reportingTo: {
    position: String,
    department: String
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'filled', 'cancelled', 'expired'],
    default: 'draft',
    index: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  visibility: {
    type: String,
    enum: ['public', 'internal', 'private'],
    default: 'public'
  },
  applicationDeadline: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value > new Date();
      },
      message: 'Application deadline must be in the future'
    }
  },
  startDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value >= new Date();
      },
      message: 'Start date cannot be in the past'
    }
  },
  applicationProcess: {
    steps: [{
      step: {
        type: String,
        enum: ['application', 'screening', 'phone-interview', 'video-interview', 'onsite-interview', 'assessment', 'reference-check', 'offer']
      },
      order: Number,
      description: String,
      estimatedDuration: String,
      isRequired: { type: Boolean, default: true }
    }],
    questionnaire: [{
      question: { type: String, required: true },
      type: {
        type: String,
        enum: ['text', 'textarea', 'multiple-choice', 'boolean', 'file'],
        default: 'text'
      },
      options: [String], // for multiple-choice
      required: { type: Boolean, default: false },
      order: Number
    }],
    coverLetterRequired: { type: Boolean, default: false },
    portfolioRequired: { type: Boolean, default: false }
  },
  stats: {
    views: { type: Number, default: 0 },
    applications: { type: Number, default: 0 },
    shortlisted: { type: Number, default: 0 },
    interviewed: { type: Number, default: 0 },
    hired: { type: Number, default: 0 },
    rejected: { type: Number, default: 0 },
    avgApplicationScore: { type: Number, default: 0 },
    timeToFill: Number, // in days
    lastApplicationDate: Date
  },
  seo: {
    slug: {
      type: String,
      unique: true,
      sparse: true
    },
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  tags: [String],
  isUrgent: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  expiresAt: Date,
  publishedAt: Date,
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
jobSchema.index({ title: 1, status: 1 });
jobSchema.index({ company: 1, status: 1 });
jobSchema.index({ recruiter: 1, status: 1 });
jobSchema.index({ 'employment.type': 1, status: 1 });
jobSchema.index({ 'location.type': 1, 'location.city': 1 });
jobSchema.index({ 'skills.required.name': 1 });
jobSchema.index({ 'experience.level': 1 });
jobSchema.index({ publishedAt: -1 });
jobSchema.index({ expiresAt: 1 });
jobSchema.index({ tags: 1 });
jobSchema.index({ 'stats.applications': -1 });

// Virtual fields
jobSchema.virtual('locationString').get(function() {
  if (this.location.type === 'remote') {
    return 'Remote';
  }
  if (this.location.type === 'hybrid') {
    return `Hybrid - ${this.location.city || 'Flexible'}`;
  }
  return `${this.location.city || ''}, ${this.location.state || ''} ${this.location.country || ''}`.trim();
});

jobSchema.virtual('salaryRange').get(function() {
  if (!this.salary.showRange || (!this.salary.min && !this.salary.max)) {
    return 'Competitive';
  }
  
  const currency = this.salary.currency || 'USD';
  const period = this.salary.period || 'yearly';
  
  if (this.salary.min && this.salary.max) {
    return `${currency} ${this.salary.min.toLocaleString()} - ${this.salary.max.toLocaleString()} ${period}`;
  } else if (this.salary.min) {
    return `${currency} ${this.salary.min.toLocaleString()}+ ${period}`;
  } else if (this.salary.max) {
    return `Up to ${currency} ${this.salary.max.toLocaleString()} ${period}`;
  }
  
  return 'Competitive';
});

jobSchema.virtual('isExpired').get(function() {
  return this.expiresAt && this.expiresAt < new Date();
});

jobSchema.virtual('daysRemaining').get(function() {
  if (!this.applicationDeadline) return null;
  const now = new Date();
  const deadline = new Date(this.applicationDeadline);
  const timeDiff = deadline.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
});

// Middleware
jobSchema.pre('save', function(next) {
  // Generate slug if not exists
  if (!this.seo.slug && this.title) {
    this.seo.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim('-');
    
    // Add company name to make it unique
    if (this.company) {
      this.seo.slug += `-${this.company.toString().slice(-6)}`;
    }
  }
  
  // Set published date when status changes to active
  if (this.isModified('status') && this.status === 'active' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Set expiry date if not set
  if (this.status === 'active' && !this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  }
  
  next();
});

// Static methods
jobSchema.statics.findActiveJobs = function(filters = {}) {
  return this.find({ status: 'active', expiresAt: { $gt: new Date() }, ...filters });
};

jobSchema.statics.findBySkills = function(skills) {
  return this.find({
    'skills.required.name': { $in: skills },
    status: 'active'
  });
};

jobSchema.statics.findByLocation = function(location) {
  return this.find({
    $or: [
      { 'location.city': new RegExp(location, 'i') },
      { 'location.state': new RegExp(location, 'i') },
      { 'location.country': new RegExp(location, 'i') },
      { 'location.type': 'remote' }
    ],
    status: 'active'
  });
};

jobSchema.statics.getPopularSkills = function() {
  return this.aggregate([
    { $match: { status: 'active' } },
    { $unwind: '$skills.required' },
    { $group: { _id: '$skills.required.name', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 }
  ]);
};

// Instance methods
jobSchema.methods.incrementViews = function() {
  this.stats.views = (this.stats.views || 0) + 1;
  return this.save();
};

jobSchema.methods.updateApplicationStats = function(change = 1) {
  this.stats.applications = (this.stats.applications || 0) + change;
  this.stats.lastApplicationDate = new Date();
  return this.save();
};

jobSchema.methods.canApply = function() {
  if (this.status !== 'active') return false;
  if (this.isExpired) return false;
  if (this.applicationDeadline && this.applicationDeadline < new Date()) return false;
  return true;
};

const Job = mongoose.model('Job', jobSchema);

module.exports = Job; 