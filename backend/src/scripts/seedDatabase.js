const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');

// Connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Sample data
const sampleCompanies = [
  {
    name: 'TechCorp Solutions',
    description: 'Leading technology company specializing in AI and machine learning solutions.',
    industry: 'Technology',
    size: 'medium',
    employees: {
      range: '51-200'
    },
    website: 'https://techcorp.com',
    logo: 'https://via.placeholder.com/200x200?text=TechCorp',
    headquarters: {
      address: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA'
    },
    contact: {
      email: 'hr@techcorp.com',
      phone: '+1-555-0123',
      website: 'https://techcorp.com'
    },
    benefits: [
      { category: 'health', name: 'Health Insurance', description: 'Comprehensive medical coverage' },
      { category: 'other', name: 'Remote Work', description: 'Flexible remote work options' },
      { category: 'retirement', name: '401k', description: '401k with company matching' },
      { category: 'time-off', name: 'Flexible Hours', description: 'Flexible working hours' }
    ],
    culture: {
      values: ['Innovation', 'Collaboration', 'Work-Life Balance'],
      workEnvironment: 'startup'
    },
    tech: {
      stack: ['JavaScript', 'Python', 'AWS', 'Docker', 'MongoDB']
    }
  },
  {
    name: 'StartupHub Inc',
    description: 'Fast-growing startup focused on digital transformation solutions.',
    industry: 'Software',
    size: 'startup',
    employees: {
      range: '11-50'
    },
    website: 'https://startuphub.com',
    logo: 'https://via.placeholder.com/200x200?text=StartupHub',
    headquarters: {
      address: '456 Innovation Ave',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      country: 'USA'
    },
    contact: {
      email: 'careers@startuphub.com',
      phone: '+1-555-0124',
      website: 'https://startuphub.com'
    },
    benefits: [
      { category: 'financial', name: 'Equity', description: 'Stock options for all employees' },
      { category: 'time-off', name: 'Unlimited PTO', description: 'Unlimited paid time off' },
      { category: 'learning', name: 'Learning Budget', description: '$2000 annual learning budget' },
      { category: 'health', name: 'Health Insurance', description: 'Full health coverage' }
    ],
    culture: {
      values: ['Fast-paced', 'Learning', 'Entrepreneurial'],
      workEnvironment: 'startup'
    },
    tech: {
      stack: ['React', 'Node.js', 'PostgreSQL', 'Kubernetes']
    }
  },
  {
    name: 'Global Enterprises',
    description: 'Fortune 500 company with operations worldwide.',
    industry: 'Finance',
    size: 'enterprise',
    employees: {
      range: '5000+'
    },
    website: 'https://globalenterprises.com',
    logo: 'https://via.placeholder.com/200x200?text=Global',
    headquarters: {
      address: '789 Corporate Blvd',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    contact: {
      email: 'hr@globalenterprises.com',
      phone: '+1-555-0125',
      website: 'https://globalenterprises.com'
    },
    benefits: [
      { category: 'health', name: 'Comprehensive Health', description: 'Full medical, dental, vision' },
      { category: 'retirement', name: 'Pension Plan', description: 'Defined benefit pension plan' },
      { category: 'other', name: 'Global Mobility', description: 'International assignment opportunities' },
      { category: 'learning', name: 'Training Programs', description: 'Professional development programs' }
    ],
    culture: {
      values: ['Excellence', 'Integrity', 'Global Mindset'],
      workEnvironment: 'corporate'
    },
    tech: {
      stack: ['Java', 'Oracle', 'SAP', 'Azure']
    }
  }
];

const sampleUsers = [
  // Recruiters
  {
    email: 'sarah.recruiter@techcorp.com',
    password: 'Password123!',
    role: 'recruiter',
    profile: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+1-555-0101',
      address: {
        city: 'San Francisco',
        state: 'CA',
        country: 'USA'
      },
      jobTitle: 'Senior Recruiter',
      department: 'Human Resources'
    },
    isEmailVerified: true
  },
  {
    email: 'mike.recruiter@startuphub.com',
    password: 'Password123!',
    role: 'recruiter',
    profile: {
      firstName: 'Mike',
      lastName: 'Chen',
      phone: '+1-555-0102',
      address: {
        city: 'Austin',
        state: 'TX',
        country: 'USA'
      },
      jobTitle: 'Talent Acquisition Lead',
      department: 'Human Resources'
    },
    isEmailVerified: true
  },
  // Candidates
  {
    email: 'alex.rodriguez@example.com',
    password: 'Password123!',
    role: 'candidate',
    profile: {
      firstName: 'Alex',
      lastName: 'Rodriguez',
      phone: '+1-555-0201',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA'
      },
      skills: [
        { name: 'JavaScript', level: 'expert', yearsOfExperience: 5 },
        { name: 'React', level: 'expert', yearsOfExperience: 4 },
        { name: 'Node.js', level: 'intermediate', yearsOfExperience: 3 },
        { name: 'MongoDB', level: 'intermediate', yearsOfExperience: 2 }
      ],
      experience: [
        {
          position: 'Senior Frontend Developer',
          company: 'Previous Tech Co',
          startDate: new Date('2021-01-01'),
          endDate: new Date('2023-12-31'),
          description: 'Led frontend development team',
          skills: ['React', 'TypeScript', 'Redux']
        }
      ],
      education: [
        {
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          institution: 'University of California',
          endDate: new Date('2020-05-01'),
          gpa: 3.8
        }
      ],
      expectedSalary: { min: 80000, max: 120000, currency: 'USD' },
      availability: 'immediate'
    },
    preferences: {
      jobTypes: ['full-time'],
      workLocation: ['remote', 'hybrid']
    },
    isEmailVerified: true
  },
  {
    email: 'emily.watson@example.com',
    password: 'Password123!',
    role: 'candidate',
    profile: {
      firstName: 'Emily',
      lastName: 'Watson',
      phone: '+1-555-0202',
      address: {
        city: 'Seattle',
        state: 'WA',
        country: 'USA'
      },
      skills: [
        { name: 'Python', level: 'expert', yearsOfExperience: 6 },
        { name: 'Django', level: 'expert', yearsOfExperience: 5 },
        { name: 'PostgreSQL', level: 'intermediate', yearsOfExperience: 4 },
        { name: 'AWS', level: 'advanced', yearsOfExperience: 2 }
      ],
      experience: [
        {
          position: 'Backend Developer',
          company: 'Data Solutions Inc',
          startDate: new Date('2020-06-01'),
          endDate: new Date('2023-11-30'),
          description: 'Developed scalable backend systems',
          skills: ['Python', 'Django', 'PostgreSQL']
        }
      ],
      education: [
        {
          degree: 'Master of Science',
          fieldOfStudy: 'Data Science',
          institution: 'Stanford University',
          endDate: new Date('2020-05-01'),
          gpa: 3.9
        }
      ],
      expectedSalary: { min: 90000, max: 140000, currency: 'USD' },
      availability: '2weeks'
    },
    preferences: {
      jobTypes: ['full-time'],
      workLocation: ['onsite', 'hybrid']
    },
    isEmailVerified: true
  }
];

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log('�� Starting database seeding...');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Company.deleteMany({}),
      Job.deleteMany({}),
      Application.deleteMany({})
    ]);

    // Hash passwords and create users first (companies need a createdBy user)
    console.log('👥 Creating users...');
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12)
      }))
    );
    
    const users = await User.insertMany(hashedUsers);
    console.log(`✅ Created ${users.length} users`);

    // Get recruiters to use as company creators
    const recruiters = users.filter(user => user.role === 'recruiter');
    
    // Create companies with createdBy field
    console.log('🏢 Creating companies...');
    const companiesWithCreators = sampleCompanies.map((company, index) => ({
      ...company,
      createdBy: recruiters[index % recruiters.length]?._id || recruiters[0]?._id
    }));
    
    const companies = await Company.insertMany(companiesWithCreators);
    console.log(`✅ Created ${companies.length} companies`);

    // Assign companies to recruiters
    if (recruiters.length > 0) {
      await User.findByIdAndUpdate(recruiters[0]._id, { 'profile.company': companies[0]._id });
      if (recruiters.length > 1) {
        await User.findByIdAndUpdate(recruiters[1]._id, { 'profile.company': companies[1]._id });
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Companies: ${companies.length}`);
    console.log(`   Users: ${users.length}`);
    
    console.log('\n👤 Sample Users Created:');
    console.log('   Recruiters:');
    sampleUsers.filter(u => u.role === 'recruiter').forEach(user => {
      console.log(`     📧 ${user.email} (${user.profile.firstName} ${user.profile.lastName}) | Password: Password123!`);
    });
    console.log('   Candidates:');
    sampleUsers.filter(u => u.role === 'candidate').forEach(user => {
      console.log(`     📧 ${user.email} (${user.profile.firstName} ${user.profile.lastName}) | Password: Password123!`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding
if (require.main === module) {
  connectDB().then(() => {
    seedDatabase();
  });
}

module.exports = seedDatabase;
