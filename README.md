# ATS (Applicant Tracking System) - Full Stack Application

A modern, full-stack Applicant Tracking System built with Next.js (Frontend) and Node.js/Express (Backend).

## 🏗️ Project Structure

```
gro-early-learning/
├── frontend/                   # Next.js Frontend Application
│   ├── app/                   # Next.js App Router
│   ├── components/            # React Components
│   ├── lib/                   # Utilities & API clients
│   ├── public/                # Static assets
│   ├── package.json           # Frontend dependencies
│   └── ...                    # Frontend configuration files
│
├── backend/                    # Express.js Backend API
│   ├── src/
│   │   ├── models/            # MongoDB Models
│   │   ├── controllers/       # API Controllers
│   │   ├── routes/            # API Routes
│   │   ├── middleware/        # Express Middleware
│   │   ├── utils/             # Backend Utilities
│   │   └── scripts/           # Database scripts
│   ├── uploads/               # File upload storage
│   ├── package.json           # Backend dependencies
│   └── ...                    # Backend configuration files
│
└── ats-workspace.code-workspace # VS Code workspace configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Configure your .env file with MongoDB connection
npm run seed    # Populate database with sample data
npm run dev     # Start backend server on port 8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev     # Start frontend server on port 3000
```

## 🎯 Features

### For Recruiters
- **Job Management**: Create, edit, and manage job postings
- **Application Tracking**: Review and manage candidate applications
- **Candidate Search**: Find and filter potential candidates
- **Company Dashboard**: Manage company profile and team

### For Candidates
- **Job Search**: Browse and search available positions
- **Profile Management**: Build comprehensive professional profiles
- **Application Tracking**: Monitor application status and progress
- **Document Management**: Upload and manage resumes and portfolios

### Technical Features
- **Authentication**: JWT-based secure authentication
- **File Uploads**: Resume and document upload system
- **Real-time Updates**: Live status updates and notifications
- **Responsive Design**: Mobile-first, responsive interface
- **Search & Filtering**: Advanced search capabilities
- **Email Notifications**: Automated email communications

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **State Management**: React Context/Hooks
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Fetch API with custom wrapper

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **File Upload**: Multer
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate limiting
- **Validation**: Express Validator

## 📊 Database Schema

- **Users**: Recruiters and Candidates with role-based access
- **Companies**: Company profiles and information
- **Jobs**: Job postings with detailed requirements
- **Applications**: Application tracking and management

## 🔧 Development

### Backend API Endpoints
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/jobs` - List jobs
- `POST /api/v1/jobs` - Create job (recruiters only)
- `POST /api/v1/applications` - Submit application
- `GET /api/v1/applications/me` - Get user's applications

### Environment Variables
See `backend/env.example` for required environment variables.

## 📝 Sample Data

The backend includes a seeding script that creates:
- 2 Recruiter accounts
- 2 Candidate accounts  
- 3 Sample companies
- Sample job postings and applications

**Test Credentials**: All users have password `Password123!`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/.next`

### Backend (Railway/Heroku)
1. Set environment variables
2. Use `backend/package.json` as entry point
3. Ensure MongoDB Atlas connection

## 📄 License

MIT License - see LICENSE file for details
