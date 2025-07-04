const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Company description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  industry: {
    type: String,
    required: [true, 'Industry is required'],
    index: true
  },
  size: {
    type: String,
    enum: ['startup', 'small', 'medium', 'large', 'enterprise'],
    required: [true, 'Company size is required']
  },
  website: {
    type: String,
    trim: true
  },
  logo: {
    type: String,
    default: null
  },
  coverImage: {
    type: String,
    default: null
  },
  headquarters: {
    street: String,
    city: { type: String, required: true },
    state: String,
    country: { type: String, required: true },
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  offices: [{
    name: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    isHeadquarters: { type: Boolean, default: false }
  }],
  contact: {
    email: {
      type: String,
      required: [true, 'Contact email is required'],
      lowercase: true,
      trim: true
    },
    phone: String,
    website: String,
    socialMedia: {
      linkedin: String,
      twitter: String,
      facebook: String,
      instagram: String
    }
  },
  founded: {
    type: Date,
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Founded date cannot be in the future'
    }
  },
  employees: {
    current: Number,
    range: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+']
    }
  },
  benefits: [{
    category: {
      type: String,
      enum: ['health', 'retirement', 'time-off', 'learning', 'wellness', 'financial', 'other']
    },
    name: String,
    description: String
  }],
  culture: {
    values: [String],
    workEnvironment: {
      type: String,
      enum: ['traditional', 'startup', 'corporate', 'creative', 'flexible']
    },
    diversity: {
      statement: String,
      initiatives: [String]
    }
  },
  tech: {
    stack: [String],
    tools: [String],
    methodologies: [String]
  },
  stats: {
    totalJobs: { type: Number, default: 0 },
    activeJobs: { type: Number, default: 0 },
    totalApplications: { type: Number, default: 0 },
    totalHires: { type: Number, default: 0 },
    averageTimeToHire: Number, // in days
    rating: {
      overall: { type: Number, min: 0, max: 5, default: 0 },
      workLifeBalance: { type: Number, min: 0, max: 5, default: 0 },
      compensation: { type: Number, min: 0, max: 5, default: 0 },
      culture: { type: Number, min: 0, max: 5, default: 0 },
      careerGrowth: { type: Number, min: 0, max: 5, default: 0 },
      reviewCount: { type: Number, default: 0 }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDocument: {
    filename: String,
    path: String,
    uploadDate: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  adminUsers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'hr_manager', 'recruiter'],
      default: 'recruiter'
    },
    permissions: [{
      type: String,
      enum: ['create_jobs', 'edit_jobs', 'delete_jobs', 'view_applications', 'manage_applications', 'manage_users', 'view_analytics']
    }],
    addedAt: { type: Date, default: Date.now }
  }],
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium', 'enterprise'],
      default: 'free'
    },
    startDate: Date,
    endDate: Date,
    features: [{
      name: String,
      limit: Number,
      used: { type: Number, default: 0 }
    }],
    isActive: { type: Boolean, default: true }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
companySchema.index({ name: 1 }, { unique: true });
companySchema.index({ industry: 1, isActive: 1 });
companySchema.index({ 'headquarters.city': 1, 'headquarters.country': 1 });
companySchema.index({ size: 1 });
companySchema.index({ 'stats.rating.overall': -1 });

// Virtual fields
companySchema.virtual('totalEmployees').get(function() {
  return this.employees.current || 0;
});

companySchema.virtual('location').get(function() {
  if (this.headquarters) {
    return `${this.headquarters.city}, ${this.headquarters.country}`;
  }
  return null;
});

// Static methods
companySchema.statics.findByIndustry = function(industry) {
  return this.find({ industry: industry, isActive: true });
};

companySchema.statics.findBySize = function(size) {
  return this.find({ size: size, isActive: true });
};

companySchema.statics.getTopRated = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ 'stats.rating.overall': -1 })
    .limit(limit);
};

// Instance methods
companySchema.methods.addAdmin = function(userId, role = 'recruiter', permissions = []) {
  const existingAdmin = this.adminUsers.find(admin => admin.user.toString() === userId.toString());
  
  if (existingAdmin) {
    existingAdmin.role = role;
    existingAdmin.permissions = permissions;
  } else {
    this.adminUsers.push({
      user: userId,
      role: role,
      permissions: permissions
    });
  }
  
  return this.save();
};

companySchema.methods.removeAdmin = function(userId) {
  this.adminUsers = this.adminUsers.filter(admin => admin.user.toString() !== userId.toString());
  return this.save();
};

companySchema.methods.updateStats = function(statsUpdate) {
  Object.keys(statsUpdate).forEach(key => {
    if (this.stats[key] !== undefined) {
      this.stats[key] = statsUpdate[key];
    }
  });
  return this.save();
};

const Company = mongoose.model('Company', companySchema);

module.exports = Company; 