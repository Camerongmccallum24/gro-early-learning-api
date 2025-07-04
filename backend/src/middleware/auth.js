const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Protect routes - require authentication
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token from header or cookies
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2) Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again!', 401));
    } else if (error.name === 'TokenExpiredError') {
      return next(new AppError('Your token has expired! Please log in again.', 401));
    }
    return next(new AppError('Token verification failed', 401));
  }

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter && currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  // 5) Check if user is active
  if (!currentUser.isActive) {
    return next(new AppError('Your account has been deactivated. Please contact support.', 401));
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

// Restrict access to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

// Optional authentication - don't fail if no token
exports.optionalAuth = catchAsync(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id);
      
      if (currentUser && currentUser.isActive && 
          (!currentUser.changedPasswordAfter || !currentUser.changedPasswordAfter(decoded.iat))) {
        req.user = currentUser;
      }
    } catch (error) {
      // Silently fail for optional auth
    }
  }

  next();
});

// Check if user owns the resource or is admin
exports.checkOwnership = (Model, userField = 'user') => {
  return catchAsync(async (req, res, next) => {
    const resource = await Model.findById(req.params.id);
    
    if (!resource) {
      return next(new AppError('Resource not found', 404));
    }

    // Admin can access everything
    if (req.user.role === 'admin') {
      req.resource = resource;
      return next();
    }

    // Check ownership
    const resourceUserId = resource[userField].toString();
    const currentUserId = req.user._id.toString();

    if (resourceUserId !== currentUserId) {
      return next(new AppError('You can only access your own resources', 403));
    }

    req.resource = resource;
    next();
  });
};

// Check if user belongs to the same company (for recruiters)
exports.checkCompanyAccess = catchAsync(async (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }

  if (req.user.role !== 'recruiter' || !req.user.profile.company) {
    return next(new AppError('You must be a recruiter with a company to access this resource', 403));
  }

  // Add company filter to the request for further processing
  req.companyFilter = { company: req.user.profile.company };
  next();
});

// Validate email verification status
exports.requireEmailVerification = (req, res, next) => {
  if (!req.user.isEmailVerified) {
    return next(new AppError('Please verify your email address to access this feature', 403));
  }
  next();
};

// Rate limiting for sensitive operations
exports.sensitiveOperationLimit = (req, res, next) => {
  // This would integrate with express-rate-limit
  // For now, we'll just add a header
  res.set('X-Rate-Limit-Sensitive', 'true');
  next();
};

// Log user activity
exports.logActivity = (action) => {
  return (req, res, next) => {
    if (req.user) {
      // In a real application, you'd log this to a database or analytics service
      console.log(`User ${req.user._id} performed action: ${action} at ${new Date().toISOString()}`);
    }
    next();
  };
}; 