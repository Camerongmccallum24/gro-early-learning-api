# ATS Backend API

A comprehensive Applicant Tracking System (ATS) backend built with Node.js, Express, and MongoDB.

## Features

### 🔐 Authentication & Authorization
- User registration and login (JWT-based)
- Role-based access control (Admin, Recruiter, Candidate)
- Email verification and password reset
- Account lockout after failed attempts
- Rate limiting for security

### 👥 User Management
- Detailed user profiles for candidates and recruiters
- Company management for recruiters
- Skills, experience, and education tracking
- Resume and document uploads

### 💼 Job Management
- Create, update, and manage job postings
- Advanced job search and filtering
- Job recommendations for candidates
- Application tracking and analytics

### 📋 Application Management
- Job application submission with resume upload
- Application status tracking and workflow
- Interview scheduling and feedback
- Bulk operations for recruiters
- Email notifications

### 📊 Analytics & Reporting
- Application and hiring statistics
- Performance metrics
- Export functionality

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **File Upload**: Multer
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting, XSS Protection
- **Validation**: Express Validator
- **Testing**: Jest (configured)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/ats_database
   JWT_SECRET=your-super-secret-jwt-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## API Documentation

### Authentication Endpoints
```
POST   /api/v1/auth/signup           - Register new user
POST   /api/v1/auth/login            - Login user
POST   /api/v1/auth/logout           - Logout user
POST   /api/v1/auth/forgot-password  - Request password reset
PATCH  /api/v1/auth/reset-password/:token - Reset password
GET    /api/v1/auth/verify-email/:token - Verify email
GET    /api/v1/auth/me               - Get current user
PATCH  /api/v1/auth/update-me        - Update user profile
```

### Job Endpoints
```
GET    /api/v1/jobs                  - Get all jobs
GET    /api/v1/jobs/:id              - Get specific job
POST   /api/v1/jobs                  - Create job (recruiter)
PATCH  /api/v1/jobs/:id              - Update job (recruiter)
DELETE /api/v1/jobs/:id              - Delete job (recruiter)
GET    /api/v1/jobs/search           - Search jobs
GET    /api/v1/jobs/recommended/for-me - Get recommended jobs
```

### Application Endpoints
```
GET    /api/v1/applications          - Get applications
POST   /api/v1/applications/jobs/:jobId/apply - Apply for job
GET    /api/v1/applications/:id      - Get application details
PATCH  /api/v1/applications/:id/status - Update application status
POST   /api/v1/applications/:id/notes - Add notes to application
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/         # Request handlers
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   └── applicationController.js
│   ├── models/             # MongoDB schemas
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   └── Company.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   └── applications.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js
│   │   ├── upload.js
│   │   └── errorHandler.js
│   ├── utils/              # Utility functions
│   │   ├── database.js
│   │   ├── email.js
│   │   ├── apiFeatures.js
│   │   ├── catchAsync.js
│   │   └── appError.js
│   └── app.js              # Express app setup
├── uploads/                # File uploads directory
├── package.json
├── .eslintrc.js
└── README.md
```

## Database Models

### User Model
- Authentication and profile information
- Role-based access (candidate, recruiter, admin)
- Skills, experience, and education
- Preferences and settings

### Job Model
- Job details and requirements
- Salary, location, and employment type
- Application process configuration
- Analytics and statistics

### Application Model
- Application submission data
- Status tracking and timeline
- Interview scheduling and feedback
- Document management

### Company Model
- Company information and branding
- Multiple offices and locations
- Team management and permissions
- Subscription and features

## Security Features

- **JWT Authentication** with secure token handling
- **Rate Limiting** to prevent abuse
- **Input Validation** and sanitization
- **XSS Protection** with data sanitization
- **CORS Configuration** for cross-origin requests
- **Helmet** for security headers
- **Password Hashing** with bcrypt
- **Account Lockout** after failed login attempts

## File Upload Support

- **Resume uploads** (PDF, DOC, DOCX)
- **Profile avatars** (JPG, PNG, GIF, WebP)
- **Company logos** (JPG, PNG, SVG)
- **Portfolio files** (PDF, ZIP)
- **Additional documents** with type validation

## Email Features

- Welcome emails with email verification
- Password reset emails
- Application status updates
- Interview invitations
- Offer letters
- Responsive HTML templates

## Development

### Available Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
npm test           # Run tests with Jest
```

### Code Quality
- ESLint configuration for Node.js
- Consistent code formatting
- Error handling patterns
- Async/await best practices

## Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ats_prod
JWT_SECRET=super-secure-production-secret
EMAIL_HOST=smtp.sendgrid.net
SENDGRID_API_KEY=your-sendgrid-api-key
FRONTEND_URL=https://yourdomain.com
```

### Production Checklist
- [ ] Set secure JWT secret
- [ ] Configure production email service
- [ ] Set up MongoDB Atlas
- [ ] Configure CORS for production domain
- [ ] Set up SSL/HTTPS
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure file storage (AWS S3, etc.)

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the test suite
6. Submit a pull request

## API Rate Limits

- **General API**: 100 requests per 15 minutes
- **Authentication**: 10 requests per 15 minutes
- **Password Reset**: 3 requests per hour

## Support

For support, email support@yourcompany.com or create an issue in the repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 