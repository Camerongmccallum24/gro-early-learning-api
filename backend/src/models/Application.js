const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
    index: true
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  applicationId: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    enum: [
      'submitted',
      'under_review',
      'screening',
      'phone_interview',
      'video_interview',
      'onsite_interview',
      'assessment',
      'reference_check',
      'offer_extended',
      'offer_accepted',
      'offer_declined',
      'hired',
      'rejected',
      'withdrawn'
    ],
    default: 'submitted',
    index: true
  },
  source: {
    type: String,
    enum: ['website', 'linkedin', 'indeed', 'glassdoor', 'referral', 'company_career_page', 'other'],
    default: 'website'
  },
  referral: {
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    referralCode: String,
    notes: String
  },
  documents: {
    resume: {
      filename: String,
      originalName: String,
      path: String,
      size: Number,
      uploadDate: { type: Date, default: Date.now },
      parsed: {
        text: String,
        skills: [String],
        experience: Number,
        education: String,
        parsedAt: Date,
        parsingError: String
      }
    },
    coverLetter: {
      type: String,
      maxlength: [2000, 'Cover letter cannot exceed 2000 characters']
    },
    portfolio: {
      filename: String,
      originalName: String,
      path: String,
      url: String,
      uploadDate: Date
    },
    additionalDocuments: [{
      type: String,
      filename: String,
      originalName: String,
      path: String,
      uploadDate: Date,
      description: String
    }]
  },
  questionnaire: [{
    questionId: String,
    question: String,
    answer: String,
    type: {
      type: String,
      enum: ['text', 'textarea', 'multiple-choice', 'boolean', 'file']
    }
  }],
  screening: {
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    autoScore: {
      skillsMatch: Number,
      experienceMatch: Number,
      educationMatch: Number,
      locationMatch: Number,
      overall: Number,
      calculatedAt: Date
    },
    manualScore: {
      score: Number,
      notes: String,
      scoredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      scoredAt: Date
    },
    flags: [{
      type: {
        type: String,
        enum: ['overqualified', 'underqualified', 'salary_mismatch', 'location_issue', 'other']
      },
      description: String,
      flaggedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      flaggedAt: { type: Date, default: Date.now }
    }],
    passed: Boolean,
    notes: String
  },
  interviews: [{
    type: {
      type: String,
      enum: ['phone', 'video', 'onsite', 'group', 'panel', 'technical', 'behavioral'],
      required: true
    },
    scheduledDate: {
      type: Date,
      required: true
    },
    duration: Number, // in minutes
    location: String,
    meetingLink: String,
    interviewers: [{
      interviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      role: String,
      isPrimary: { type: Boolean, default: false }
    }],
    status: {
      type: String,
      enum: ['scheduled', 'in_progress', 'completed', 'cancelled', 'no_show'],
      default: 'scheduled'
    },
    feedback: {
      overallRating: {
        type: Number,
        min: 1,
        max: 5
      },
      technicalSkills: {
        type: Number,
        min: 1,
        max: 5
      },
      communication: {
        type: Number,
        min: 1,
        max: 5
      },
      culturalFit: {
        type: Number,
        min: 1,
        max: 5
      },
      problemSolving: {
        type: Number,
        min: 1,
        max: 5
      },
      strengths: [String],
      weaknesses: [String],
      notes: String,
      recommendation: {
        type: String,
        enum: ['strong_hire', 'hire', 'maybe', 'no_hire', 'strong_no_hire']
      },
      nextSteps: String
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    submittedAt: Date,
    recordingUrl: String,
    notes: String
  }],
  assessments: [{
    type: {
      type: String,
      enum: ['coding', 'technical', 'personality', 'cognitive', 'case_study', 'other']
    },
    name: String,
    platform: String,
    assignedDate: Date,
    dueDate: Date,
    completedDate: Date,
    score: Number,
    maxScore: Number,
    percentage: Number,
    results: {
      summary: String,
      details: mongoose.Schema.Types.Mixed,
      reportUrl: String
    },
    status: {
      type: String,
      enum: ['assigned', 'in_progress', 'completed', 'overdue', 'skipped'],
      default: 'assigned'
    }
  }],
  offer: {
    extendedDate: Date,
    expiryDate: Date,
    position: String,
    salary: {
      amount: Number,
      currency: { type: String, default: 'USD' },
      period: { type: String, default: 'yearly' }
    },
    benefits: [String],
    startDate: Date,
    equity: {
      percentage: Number,
      description: String
    },
    negotiation: [{
      round: Number,
      candidateRequest: String,
      companyResponse: String,
      date: Date
    }],
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'withdrawn', 'expired'],
      default: 'pending'
    },
    declineReason: String,
    acceptedDate: Date,
    documents: [{
      type: String,
      filename: String,
      path: String,
      uploadDate: Date
    }]
  },
  timeline: [{
    status: String,
    date: { type: Date, default: Date.now },
    notes: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isSystemGenerated: { type: Boolean, default: false },
    metadata: mongoose.Schema.Types.Mixed
  }],
  notes: [{
    content: String,
    isPrivate: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: { type: Date, default: Date.now },
    tags: [String]
  }],
  communication: [{
    type: {
      type: String,
      enum: ['email', 'phone', 'sms', 'in_person', 'video_call']
    },
    direction: {
      type: String,
      enum: ['inbound', 'outbound']
    },
    subject: String,
    content: String,
    attachments: [String],
    timestamp: { type: Date, default: Date.now },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  analytics: {
    sourceTracking: {
      utm_source: String,
      utm_medium: String,
      utm_campaign: String,
      referrer: String,
      ip: String,
      userAgent: String
    },
    timeMetrics: {
      timeToApply: Number, // seconds from job view to application
      timeInStatus: mongoose.Schema.Types.Mixed, // time spent in each status
      totalProcessTime: Number // total time from application to final decision
    },
    interactions: {
      profileViews: { type: Number, default: 0 },
      resumeDownloads: { type: Number, default: 0 },
      messagesSent: { type: Number, default: 0 },
      messagesReceived: { type: Number, default: 0 }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  withdrawnAt: Date,
  withdrawalReason: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound indexes
applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });
applicationSchema.index({ status: 1, createdAt: -1 });
applicationSchema.index({ job: 1, status: 1 });
applicationSchema.index({ candidate: 1, status: 1 });
applicationSchema.index({ 'screening.score': -1 });
applicationSchema.index({ createdAt: -1 });

// Virtual fields
applicationSchema.virtual('currentStage').get(function() {
  if (this.status === 'hired' || this.status === 'rejected' || this.status === 'withdrawn') {
    return this.status;
  }
  
  const statusOrder = [
    'submitted',
    'under_review',
    'screening',
    'phone_interview',
    'video_interview',
    'onsite_interview',
    'assessment',
    'reference_check',
    'offer_extended',
    'offer_accepted'
  ];
  
  return statusOrder.indexOf(this.status);
});

applicationSchema.virtual('averageInterviewRating').get(function() {
  const completedInterviews = this.interviews.filter(interview => 
    interview.status === 'completed' && interview.feedback && interview.feedback.overallRating
  );
  
  if (completedInterviews.length === 0) return null;
  
  const totalRating = completedInterviews.reduce((sum, interview) => 
    sum + interview.feedback.overallRating, 0
  );
  
  return Math.round((totalRating / completedInterviews.length) * 10) / 10;
});

applicationSchema.virtual('daysInProcess').get(function() {
  const start = this.createdAt;
  const end = this.status === 'hired' || this.status === 'rejected' || this.status === 'withdrawn' 
    ? this.updatedAt 
    : new Date();
  
  return Math.floor((end - start) / (1000 * 60 * 60 * 24));
});

// Middleware
applicationSchema.pre('save', function(next) {
  // Generate unique application ID
  if (!this.applicationId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    this.applicationId = `APP-${timestamp}-${random}`.toUpperCase();
  }
  
  // Add to timeline if status changed
  if (this.isModified('status')) {
    const timelineEntry = {
      status: this.status,
      date: new Date(),
      isSystemGenerated: true
    };
    
    if (!this.timeline) this.timeline = [];
    this.timeline.push(timelineEntry);
  }
  
  next();
});

// Static methods
applicationSchema.statics.findByStatus = function(status) {
  return this.find({ status: status, isActive: true });
};

applicationSchema.statics.getApplicationStats = function(filters = {}) {
  return this.aggregate([
    { $match: { isActive: true, ...filters } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        avgScore: { $avg: '$screening.score' }
      }
    }
  ]);
};

applicationSchema.statics.findTopCandidates = function(jobId, limit = 10) {
  return this.find({ job: jobId, isActive: true })
    .sort({ 'screening.score': -1 })
    .limit(limit)
    .populate('candidate', 'profile.firstName profile.lastName profile.avatar');
};

// Instance methods
applicationSchema.methods.updateStatus = function(newStatus, notes = '', updatedBy = null) {
  this.status = newStatus;
  
  const timelineEntry = {
    status: newStatus,
    date: new Date(),
    notes: notes,
    updatedBy: updatedBy,
    isSystemGenerated: !updatedBy
  };
  
  this.timeline.push(timelineEntry);
  
  return this.save();
};

applicationSchema.methods.addNote = function(content, createdBy, isPrivate = false, tags = []) {
  this.notes.push({
    content: content,
    isPrivate: isPrivate,
    createdBy: createdBy,
    tags: tags
  });
  
  return this.save();
};

applicationSchema.methods.scheduleInterview = function(interviewData) {
  this.interviews.push(interviewData);
  
  if (this.status === 'submitted' || this.status === 'under_review' || this.status === 'screening') {
    this.status = `${interviewData.type}_interview`;
  }
  
  return this.save();
};

applicationSchema.methods.submitFeedback = function(interviewIndex, feedback, submittedBy) {
  if (this.interviews[interviewIndex]) {
    this.interviews[interviewIndex].feedback = feedback;
    this.interviews[interviewIndex].submittedBy = submittedBy;
    this.interviews[interviewIndex].submittedAt = new Date();
    this.interviews[interviewIndex].status = 'completed';
  }
  
  return this.save();
};

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application; 