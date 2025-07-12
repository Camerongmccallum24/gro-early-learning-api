# GRO Early Learning Frontend (Standalone)

This is the frontend-only version of the GRO Early Learning website. All backend dependencies have been removed and replaced with static data.

## What's Been Changed

### Removed Backend Dependencies

- **Authentication system** - Login/register pages now redirect to contact
- **Job application system** - Applications now direct users to email/phone contact
- **Admin dashboard** - Admin pages redirect to appropriate static pages
- **User dashboard** - Dashboard redirects to jobs page
- **API integration** - All API calls replaced with mock data

### Mock Data Implementation

- **Job listings** - Static job data in `data/mockJobsData.ts`
- **Application modal** - Now shows contact information instead of form submission
- **Job filtering** - Works with mock data for search and location filtering

## Features Still Available

### ✅ Working Features

- **Job browsing** - View all available positions
- **Job details** - Full job descriptions and requirements
- **Location-based job filtering** - Filter jobs by location
- **Search functionality** - Search jobs by title, description, or tags
- **Contact information** - Complete contact details and forms
- **All informational pages** - About, Benefits, Professional Development, etc.
- **Responsive design** - Works on all devices

### ❌ Removed Features

- User authentication and registration
- Online job applications
- Admin dashboard and job management
- Application tracking
- User profiles and dashboards

## How to Run

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Contact Information

Since applications are now handled via direct contact:

- **Email:** careers@groearlylearning.com.au
- **Phone:** 1300 GRO CARE
- **Website:** Browse jobs and contact us directly

## Mock Data

The application includes realistic mock data for:

- 5 sample job positions across different locations
- Various job types (Educator, Director, Educational Leader, etc.)
- Location-specific job filtering
- Salary ranges and benefits information

## Deployment

This frontend can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any web server capable of serving static files

The application is completely self-contained and doesn't require a backend server.
