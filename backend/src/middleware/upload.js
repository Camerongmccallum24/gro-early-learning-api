const multer = require('multer');
const path = require('path');
const AppError = require('../utils/appError');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    
    switch (file.fieldname) {
      case 'resume':
        uploadPath += 'resumes/';
        break;
      case 'avatar':
        uploadPath += 'avatars/';
        break;
      case 'portfolio':
        uploadPath += 'portfolios/';
        break;
      case 'companyLogo':
        uploadPath += 'company-logos/';
        break;
      case 'document':
        uploadPath += 'documents/';
        break;
      default:
        uploadPath += 'misc/';
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extension);
    
    cb(null, `${baseName}-${uniqueSuffix}${extension}`);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Define allowed file types for different upload types
  const allowedTypes = {
    resume: {
      mimeTypes: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ],
      extensions: ['.pdf', '.doc', '.docx']
    },
    avatar: {
      mimeTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp'
      ],
      extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    },
    portfolio: {
      mimeTypes: [
        'application/pdf',
        'application/zip',
        'application/x-zip-compressed'
      ],
      extensions: ['.pdf', '.zip']
    },
    companyLogo: {
      mimeTypes: [
        'image/jpeg',
        'image/png',
        'image/svg+xml'
      ],
      extensions: ['.jpg', '.jpeg', '.png', '.svg']
    },
    document: {
      mimeTypes: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png'
      ],
      extensions: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']
    }
  };

  const fileType = file.fieldname;
  const allowed = allowedTypes[fileType];

  if (!allowed) {
    return cb(new AppError('Invalid upload field', 400), false);
  }

  // Check MIME type
  if (!allowed.mimeTypes.includes(file.mimetype)) {
    return cb(new AppError(`Invalid file type. Allowed types: ${allowed.extensions.join(', ')}`, 400), false);
  }

  // Check file extension
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (!allowed.extensions.includes(fileExtension)) {
    return cb(new AppError(`Invalid file extension. Allowed extensions: ${allowed.extensions.join(', ')}`, 400), false);
  }

  cb(null, true);
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    files: 5 // Maximum 5 files per request
  },
  fileFilter: fileFilter
});

// Middleware for single file upload
exports.uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadSingle = upload.single(fieldName);
    
    uploadSingle(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new AppError('File too large. Maximum size is 5MB.', 400));
        } else if (err.code === 'LIMIT_FILE_COUNT') {
          return next(new AppError('Too many files. Maximum is 5 files.', 400));
        } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return next(new AppError('Unexpected file field.', 400));
        }
        return next(new AppError(`Upload error: ${err.message}`, 400));
      } else if (err) {
        return next(err);
      }
      next();
    });
  };
};

// Middleware for multiple file upload
exports.uploadMultiple = (fieldName, maxCount = 5) => {
  return (req, res, next) => {
    const uploadMultiple = upload.array(fieldName, maxCount);
    
    uploadMultiple(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new AppError('File too large. Maximum size is 5MB.', 400));
        } else if (err.code === 'LIMIT_FILE_COUNT') {
          return next(new AppError(`Too many files. Maximum is ${maxCount} files.`, 400));
        } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return next(new AppError('Unexpected file field.', 400));
        }
        return next(new AppError(`Upload error: ${err.message}`, 400));
      } else if (err) {
        return next(err);
      }
      next();
    });
  };
};

// Middleware for mixed file upload (different field names)
exports.uploadFields = (fields) => {
  return (req, res, next) => {
    const uploadFields = upload.fields(fields);
    
    uploadFields(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new AppError('File too large. Maximum size is 5MB.', 400));
        } else if (err.code === 'LIMIT_FILE_COUNT') {
          return next(new AppError('Too many files uploaded.', 400));
        } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return next(new AppError('Unexpected file field.', 400));
        }
        return next(new AppError(`Upload error: ${err.message}`, 400));
      } else if (err) {
        return next(err);
      }
      next();
    });
  };
};

// Middleware to validate required files
exports.requireFiles = (requiredFields) => {
  return (req, res, next) => {
    const missingFiles = [];
    
    requiredFields.forEach(field => {
      if (!req.file && !req.files) {
        missingFiles.push(field);
      } else if (req.files && !req.files[field]) {
        missingFiles.push(field);
      } else if (req.file && req.file.fieldname !== field) {
        missingFiles.push(field);
      }
    });
    
    if (missingFiles.length > 0) {
      return next(new AppError(`Missing required files: ${missingFiles.join(', ')}`, 400));
    }
    
    next();
  };
};

// Middleware to process uploaded files (add metadata)
exports.processFiles = (req, res, next) => {
  if (req.file) {
    req.file.uploadedAt = new Date();
    req.file.uploadedBy = req.user ? req.user._id : null;
  }
  
  if (req.files) {
    Object.keys(req.files).forEach(fieldname => {
      const files = Array.isArray(req.files[fieldname]) ? req.files[fieldname] : [req.files[fieldname]];
      files.forEach(file => {
        file.uploadedAt = new Date();
        file.uploadedBy = req.user ? req.user._id : null;
      });
    });
  }
  
  next();
};

// Predefined upload configurations for common use cases
exports.resumeUpload = exports.uploadSingle('resume');
exports.avatarUpload = exports.uploadSingle('avatar');
exports.portfolioUpload = exports.uploadSingle('portfolio');
exports.companyLogoUpload = exports.uploadSingle('companyLogo');
exports.documentUpload = exports.uploadSingle('document');

exports.applicationUpload = exports.uploadFields([
  { name: 'resume', maxCount: 1 },
  { name: 'portfolio', maxCount: 1 },
  { name: 'document', maxCount: 3 }
]);

exports.profileUpload = exports.uploadFields([
  { name: 'avatar', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]); 