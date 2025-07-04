# ATS Frontend - Next.js Application

This is the frontend application for the ATS (Applicant Tracking System) built with Next.js 14.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── jobs/              # Job-related pages
│   └── layout.tsx         # Root layout
├── components/             # Reusable React components
│   ├── ui/                # Base UI components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   └── shared/            # Shared components
├── lib/                   # Utilities and configurations
│   ├── api.ts             # API client
│   ├── auth.ts            # Authentication helpers
│   └── types.ts           # TypeScript type definitions
├── hooks/                 # Custom React hooks
├── public/                # Static assets
└── data/                  # Static data and configurations
```

## 🎯 Features

### Authentication
- User login and registration
- JWT token management
- Protected routes
- Role-based access control

### Dashboard
- **Recruiter Dashboard**: Job management, application tracking
- **Candidate Dashboard**: Profile management, job search, application tracking

### Job Management
- Job listing and search
- Job application process
- Application status tracking

### Profile Management
- User profile creation and editing
- Resume upload and management
- Skills and experience tracking

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components
- **State Management**: React Context + Hooks
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Fetch API

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### API Integration

The frontend communicates with the backend API running on port 8000. All API calls are configured in `lib/api.ts`.

## 📱 Pages Overview

### Public Pages
- `/` - Landing page
- `/jobs` - Public job listings
- `/jobs/[id]` - Job details
- `/auth/login` - User login
- `/auth/signup` - User registration

### Protected Pages (Recruiters)
- `/dashboard/recruiter` - Recruiter overview
- `/dashboard/recruiter/jobs` - Job management
- `/dashboard/recruiter/applications` - Application management
- `/dashboard/recruiter/candidates` - Candidate search

### Protected Pages (Candidates)
- `/dashboard/candidate` - Candidate overview
- `/dashboard/candidate/profile` - Profile management
- `/dashboard/candidate/jobs` - Job search
- `/dashboard/candidate/applications` - Application tracking

## 🎨 Styling

This project uses Tailwind CSS for styling with a custom design system defined in `tailwind.config.js`.

### Theme
- Modern, clean design
- Responsive mobile-first approach
- Consistent color palette
- Accessible components

## 🧪 Development

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Consistent file naming conventions

### Best Practices
- Component composition
- Custom hooks for logic reuse
- Type-safe API calls
- Error boundary implementation
- Loading states and error handling

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 📄 API Documentation

The frontend expects the backend API to be running on `http://localhost:8000/api/v1`. 

Key API endpoints used:
- `POST /auth/login` - User authentication
- `GET /jobs` - Fetch job listings
- `POST /jobs` - Create new job (recruiters)
- `GET /applications/me` - User's applications
- `POST /applications` - Submit job application

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for all new files
3. Add proper error handling
4. Write descriptive commit messages
5. Test your changes thoroughly 