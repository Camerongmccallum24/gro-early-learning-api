const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Company = require('../models/Company');
const Job = require('../models/Job');

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

// GRO Early Learning company data
const groCompany = {
  name: 'GRO Early Learning',
  description: 'Leading provider of exceptional early childhood education and care across Queensland mining communities. We create nurturing environments where children thrive and develop their unique potential.',
  industry: 'Early Childhood Education',
  size: 'medium',
  employees: {
    range: '51-200'
  },
  website: 'https://groearlylearning.com.au',
  logo: '/GRO-logo.png',
  headquarters: {
    address: '60-62 West Street, Menzies',
    city: 'Mount Isa',
    state: 'QLD',
    zipCode: '4825',
    country: 'Australia'
  },
  contact: {
    email: 'careers@groearlylearning.com.au',
    phone: '1800 GRO JOBS',
    website: 'https://groearlylearning.com.au'
  },
  benefits: [
    { category: 'health', name: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage' },
    { category: 'financial', name: 'Relocation Support', description: 'Up to $15,000 relocation assistance for regional moves' },
    { category: 'learning', name: 'Professional Development', description: 'Ongoing training and career progression pathways' },
    { category: 'time-off', name: 'Flexible Hours', description: 'Work-life balance with flexible scheduling options' },
    { category: 'other', name: 'Community Lifestyle', description: 'Unique outback lifestyle in vibrant mining communities' }
  ],
  culture: {
    values: ['Child-Centered Care', 'Community Connection', 'Excellence in Education', 'Professional Growth'],
    workEnvironment: 'flexible'
  },
  locations: [
    {
      name: 'Mount Isa Centre',
      address: '60-62 West Street, Menzies, QLD 4825',
      phone: '(07) 4743 8123',
      email: 'mountisa@groearlylearning.com.au'
    },
    {
      name: 'Moranbah Centre',
      address: '164-166 Mills Ave, Moranbah, QLD 4744',
      phone: '(07) 4941 7456',
      email: 'moranbah@groearlylearning.com.au'
    },
    {
      name: 'Charters Towers Centre',
      address: 'Coming January 2026',
      phone: '1800 GRO JOBS',
      email: 'charterstowers@groearlylearning.com.au'
    }
  ]
};

// GRO-specific job postings
const groJobs = [
  // Mount Isa Positions
  {
    title: 'Lead Educator - Mount Isa',
    description: `Join our established Mount Isa team as a Lead Educator and make a meaningful impact in early childhood education. You'll guide a team of educators while creating engaging learning experiences for children aged 6 weeks to 6 years.

Our Mount Isa centre is located in Queensland's largest mining city, offering a unique lifestyle with excellent facilities and strong community connections. This role offers competitive remuneration, comprehensive benefits, and clear career progression pathways.`,
    summary: 'Lead our Mount Isa team in delivering exceptional early childhood education with career growth opportunities.',
    requirements: [
      'Bachelor of Early Childhood Education or equivalent',
      '2+ years experience in early childhood education',
      'Current Working with Children Check (Blue Card)',
      'First Aid and CPR certification',
      'Strong leadership and communication skills'
    ],
    responsibilities: [
      'Lead and mentor a team of educators',
      'Develop and implement age-appropriate curriculum',
      'Build strong relationships with children and families',
      'Ensure compliance with National Quality Standards',
      'Contribute to centre operations and continuous improvement'
    ],
    qualifications: [
      'Recognized early childhood teaching qualification',
      'Demonstrated experience in program planning',
      'Knowledge of Early Years Learning Framework',
      'Commitment to inclusive education practices'
    ],
    skills: {
      required: [
        { name: 'Early Childhood Education', level: 'advanced', priority: 'must-have' },
        { name: 'Team Leadership', level: 'intermediate', priority: 'must-have' },
        { name: 'Child Development', level: 'advanced', priority: 'must-have' },
        { name: 'Communication', level: 'advanced', priority: 'must-have' }
      ],
      preferred: [
        { name: 'Curriculum Development', level: 'intermediate' },
        { name: 'Parent Engagement', level: 'advanced' },
        { name: 'Behavioral Management', level: 'intermediate' }
      ]
    },
    experience: {
      min: 2,
      max: 8,
      level: 'mid'
    },
    education: {
      level: 'bachelor',
      field: 'Early Childhood Education',
      required: true
    },
    salary: {
      min: 65000,
      max: 85000,
      currency: 'AUD',
      period: 'yearly',
      isNegotiable: true,
      showRange: true
    },
    benefits: [
      { category: 'financial', name: 'Relocation Support', description: 'Up to $15,000 relocation assistance' },
      { category: 'learning', name: 'Professional Development', description: 'Ongoing training opportunities' },
      { category: 'health', name: 'Health Benefits', description: 'Comprehensive health coverage' }
    ],
    location: {
      type: 'onsite',
      city: 'Mount Isa',
      state: 'Queensland',
      country: 'Australia',
      coordinates: {
        latitude: -20.7211,
        longitude: 139.4917
      }
    },
    employment: {
      type: 'full-time',
      hoursPerWeek: 38,
      schedule: 'standard'
    },
    department: 'Early Childhood Education',
    status: 'active',
    priority: 'high',
    visibility: 'public',
    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    applicationProcess: {
      steps: [
        { step: 'application', order: 1, description: 'Submit application and resume', isRequired: true },
        { step: 'phone-interview', order: 2, description: 'Initial phone screening', isRequired: true },
        { step: 'video-interview', order: 3, description: 'Video interview with centre director', isRequired: true },
        { step: 'reference-check', order: 4, description: 'Reference verification', isRequired: true },
        { step: 'offer', order: 5, description: 'Job offer and contract', isRequired: true }
      ],
      questionnaire: [
        { question: 'What attracts you to working in early childhood education?', type: 'textarea', required: true, order: 1 },
        { question: 'How do you approach building relationships with children and families?', type: 'textarea', required: true, order: 2 },
        { question: 'Are you willing to relocate to Mount Isa?', type: 'boolean', required: true, order: 3 }
      ],
      coverLetterRequired: true,
      portfolioRequired: false
    },
    tags: ['mount-isa', 'lead-educator', 'early-childhood', 'education', 'full-time', 'relocation-support'],
    seo: {
      metaTitle: 'Lead Educator - Mount Isa | GRO Early Learning Careers',
      metaDescription: 'Join GRO Early Learning as a Lead Educator in Mount Isa. Competitive salary, relocation support, and career growth in Queensland mining community.',
      keywords: ['early childhood educator', 'mount isa jobs', 'lead educator', 'queensland education', 'childcare careers']
    }
  },
  
  // Moranbah Positions
  {
    title: 'Early Childhood Teacher - Moranbah',
    description: `Be part of our exciting January 2026 opening in Moranbah! We're seeking passionate Early Childhood Teachers to join our brand new centre in the heart of Queensland's Bowen Basin.

This is a unique opportunity to establish educational programs from the ground up while working with state-of-the-art facilities and a supportive team. Moranbah offers an excellent lifestyle with competitive mining industry salaries and strong community connections.`,
    summary: 'Shape the future of early childhood education at our new Moranbah centre opening January 2026.',
    requirements: [
      'Bachelor of Early Childhood Teaching (4-year degree)',
      'Current teacher registration with Queensland College of Teachers',
      'Working with Children Check (Blue Card)',
      'Current First Aid, CPR, and Anaphylaxis certificates',
      'Passion for high-quality early childhood education'
    ],
    responsibilities: [
      'Plan and implement educational programs for children 0-6 years',
      'Create inclusive learning environments',
      'Work collaboratively with education and care teams',
      'Build strong partnerships with families and community',
      'Maintain accurate documentation and assessments'
    ],
    qualifications: [
      'Approved 4-year Early Childhood Teaching qualification',
      'Queensland teacher registration (or eligibility)',
      'Understanding of Queensland Kindergarten Learning Guideline',
      'Knowledge of National Quality Standards'
    ],
    skills: {
      required: [
        { name: 'Early Childhood Teaching', level: 'advanced', priority: 'must-have' },
        { name: 'Program Planning', level: 'intermediate', priority: 'must-have' },
        { name: 'Child Assessment', level: 'intermediate', priority: 'must-have' },
        { name: 'Family Engagement', level: 'intermediate', priority: 'must-have' }
      ],
      preferred: [
        { name: 'Inclusive Education', level: 'intermediate' },
        { name: 'Play-Based Learning', level: 'advanced' },
        { name: 'Cultural Competency', level: 'intermediate' }
      ]
    },
    experience: {
      min: 1,
      max: 5,
      level: 'junior'
    },
    education: {
      level: 'bachelor',
      field: 'Early Childhood Teaching',
      required: true
    },
    salary: {
      min: 70000,
      max: 90000,
      currency: 'AUD',
      period: 'yearly',
      isNegotiable: true,
      showRange: true
    },
    benefits: [
      { category: 'financial', name: 'New Centre Bonus', description: '$5,000 joining bonus for new centre opening' },
      { category: 'financial', name: 'Relocation Support', description: 'Up to $15,000 relocation assistance' },
      { category: 'learning', name: 'Mentorship Program', description: 'Dedicated mentoring for new team members' }
    ],
    location: {
      type: 'onsite',
      city: 'Moranbah',
      state: 'Queensland',
      country: 'Australia',
      coordinates: {
        latitude: -22.0012,
        longitude: 148.0588
      }
    },
    employment: {
      type: 'full-time',
      hoursPerWeek: 38,
      schedule: 'standard'
    },
    department: 'Early Childhood Teaching',
    status: 'active',
    priority: 'urgent',
    visibility: 'public',
    applicationDeadline: new Date('2025-11-30'),
    startDate: new Date('2026-01-15'),
    applicationProcess: {
      steps: [
        { step: 'application', order: 1, description: 'Submit application with teaching portfolio', isRequired: true },
        { step: 'phone-interview', order: 2, description: 'Initial discussion about the role', isRequired: true },
        { step: 'video-interview', order: 3, description: 'Teaching demonstration and interview', isRequired: true },
        { step: 'reference-check', order: 4, description: 'Professional reference verification', isRequired: true },
        { step: 'offer', order: 5, description: 'Contract offer and welcome', isRequired: true }
      ],
      questionnaire: [
        { question: 'What excites you about joining a new centre opening?', type: 'textarea', required: true, order: 1 },
        { question: 'How do you create engaging learning environments for young children?', type: 'textarea', required: true, order: 2 },
        { question: 'Are you available to start in January 2026?', type: 'boolean', required: true, order: 3 }
      ],
      coverLetterRequired: true,
      portfolioRequired: true
    },
    tags: ['moranbah', 'teacher', 'early-childhood', 'new-centre', 'full-time', 'january-2026'],
    seo: {
      metaTitle: 'Early Childhood Teacher - Moranbah | GRO Early Learning',
      metaDescription: 'Join our new Moranbah centre opening January 2026. Qualified teachers wanted for our state-of-the-art early learning facility.',
      keywords: ['early childhood teacher', 'moranbah jobs', 'new centre opening', 'queensland teacher', 'bowen basin careers']
    }
  },
  
  // Charters Towers Position
  {
    title: 'Centre Director - Charters Towers',
    description: `Lead our exciting new Charters Towers centre opening in January 2026! We're seeking an experienced Centre Director to establish and manage our third Queensland location in this historic mining town.

This is a rare opportunity to build a centre from the ground up, implementing best practices in early childhood education while contributing to the local community. Charters Towers offers a unique heritage lifestyle with modern amenities and strong community spirit.`,
    summary: 'Lead and establish our new Charters Towers centre with full operational responsibility and career growth.',
    requirements: [
      'Approved management qualification or equivalent experience',
      '5+ years early childhood education management experience',
      'Current Working with Children Check (Blue Card)',
      'Demonstrated leadership and business acumen',
      'Strong understanding of National Quality Standards'
    ],
    responsibilities: [
      'Establish and manage all centre operations',
      'Lead recruitment and team development',
      'Ensure compliance with regulatory requirements',
      'Build community partnerships and stakeholder relationships',
      'Drive quality improvement and educational excellence'
    ],
    qualifications: [
      'Relevant management qualification in early childhood or equivalent',
      'Proven track record in centre management',
      'Financial management and budgeting experience',
      'Strong knowledge of childcare regulations and standards'
    ],
    skills: {
      required: [
        { name: 'Centre Management', level: 'expert', priority: 'must-have' },
        { name: 'Leadership', level: 'expert', priority: 'must-have' },
        { name: 'Financial Management', level: 'advanced', priority: 'must-have' },
        { name: 'Stakeholder Engagement', level: 'advanced', priority: 'must-have' }
      ],
      preferred: [
        { name: 'Business Development', level: 'intermediate' },
        { name: 'Community Relations', level: 'advanced' },
        { name: 'Strategic Planning', level: 'advanced' }
      ]
    },
    experience: {
      min: 5,
      max: 15,
      level: 'senior'
    },
    education: {
      level: 'bachelor',
      field: 'Management or Early Childhood Education',
      required: true
    },
    salary: {
      min: 85000,
      max: 110000,
      currency: 'AUD',
      period: 'yearly',
      isNegotiable: true,
      showRange: true
    },
    benefits: [
      { category: 'financial', name: 'Leadership Bonus', description: '$10,000 establishment bonus for new centre setup' },
      { category: 'financial', name: 'Relocation Package', description: 'Comprehensive relocation support up to $20,000' },
      { category: 'other', name: 'Autonomy', description: 'Full operational autonomy and decision-making authority' }
    ],
    location: {
      type: 'onsite',
      city: 'Charters Towers',
      state: 'Queensland',
      country: 'Australia',
      coordinates: {
        latitude: -20.0747,
        longitude: 146.2669
      }
    },
    employment: {
      type: 'full-time',
      hoursPerWeek: 38,
      schedule: 'standard'
    },
    department: 'Management',
    status: 'active',
    priority: 'urgent',
    visibility: 'public',
    applicationDeadline: new Date('2025-10-31'),
    startDate: new Date('2025-12-01'),
    applicationProcess: {
      steps: [
        { step: 'application', order: 1, description: 'Submit comprehensive application', isRequired: true },
        { step: 'phone-interview', order: 2, description: 'Initial leadership discussion', isRequired: true },
        { step: 'assessment', order: 3, description: 'Management assessment and presentation', isRequired: true },
        { step: 'onsite-interview', order: 4, description: 'Final interview with regional management', isRequired: true },
        { step: 'offer', order: 5, description: 'Executive offer and contract negotiation', isRequired: true }
      ],
      questionnaire: [
        { question: 'Describe your experience in establishing new educational facilities.', type: 'textarea', required: true, order: 1 },
        { question: 'How would you build community relationships in a new location?', type: 'textarea', required: true, order: 2 },
        { question: 'What is your vision for excellence in early childhood education?', type: 'textarea', required: true, order: 3 }
      ],
      coverLetterRequired: true,
      portfolioRequired: false
    },
    tags: ['charters-towers', 'director', 'management', 'new-centre', 'leadership', 'january-2026'],
    seo: {
      metaTitle: 'Centre Director - Charters Towers | GRO Early Learning',
      metaDescription: 'Lead our new Charters Towers centre. Experienced director needed for January 2026 opening in historic Queensland town.',
      keywords: ['centre director', 'charters towers jobs', 'early childhood management', 'queensland director', 'childcare leadership']
    }
  }
];

// GRO Recruiter User
const groRecruiter = {
  email: 'sarah.watson@groearlylearning.com.au',
  password: 'GroCareers2025!',
  role: 'recruiter',
  profile: {
    firstName: 'Sarah',
    lastName: 'Watson',
    phone: '1800 476 5627',
    address: {
      city: 'Mount Isa',
      state: 'QLD',
      country: 'Australia'
    },
    jobTitle: 'Regional Recruitment Manager',
    department: 'Human Resources'
  },
  isEmailVerified: true
};

// Main seeding function
const seedGroData = async () => {
  try {
    console.log('🌱 Starting GRO Early Learning data seeding...');

    // Create GRO recruiter first (needed for company createdBy)
    console.log('👥 Creating GRO recruiter...');
    let recruiter = await User.findOne({ email: groRecruiter.email });
    
    if (!recruiter) {
      // Hash password before creating user
      const hashedPassword = await bcrypt.hash(groRecruiter.password, 12);
      recruiter = await User.create({
        ...groRecruiter,
        password: hashedPassword
      });
      console.log('✅ Created GRO recruiter');
    } else {
      console.log('ℹ️  GRO recruiter already exists - updating password to ensure it\'s correct');
      // Update the existing user's password to ensure it's properly hashed
      const hashedPassword = await bcrypt.hash(groRecruiter.password, 12);
      recruiter.password = hashedPassword;
      await recruiter.save();
      console.log('✅ Updated GRO recruiter password');
    }

    // Create or update GRO company
    console.log('🏢 Creating GRO Early Learning company...');
    let company = await Company.findOne({ name: 'GRO Early Learning' });
    
    if (!company) {
      company = await Company.create({
        ...groCompany,
        createdBy: recruiter._id
      });
      console.log('✅ Created GRO Early Learning company');
      
      // Update recruiter with company reference
      await User.findByIdAndUpdate(recruiter._id, { 
        'profile.company': company._id 
      });
    } else {
      console.log('ℹ️  GRO Early Learning company already exists');
    }

    // Create GRO jobs
    console.log('💼 Creating GRO job postings...');
    for (const jobData of groJobs) {
      let job = await Job.findOne({ title: jobData.title });
      
      if (!job) {
        job = await Job.create({
          ...jobData,
          company: company._id,
          recruiter: recruiter._id,
          lastModifiedBy: recruiter._id
        });
        console.log(`✅ Created job: ${jobData.title}`);
      } else {
        console.log(`ℹ️  Job already exists: ${jobData.title}`);
      }
    }

    console.log('🎉 GRO Early Learning data seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Company: ${company.name}`);
    console.log(`   Recruiter: ${recruiter.profile.firstName} ${recruiter.profile.lastName} (${recruiter.email})`);
    console.log(`   Jobs: ${groJobs.length} positions across 3 locations`);
    
    console.log('\n🗝️  Login Credentials:');
    console.log(`   Email: ${groRecruiter.email}`);
    console.log(`   Password: ${groRecruiter.password}`);
    
    console.log('\n📍 Job Locations:');
    groJobs.forEach(job => {
      console.log(`   🎯 ${job.title} - ${job.location.city}, ${job.location.state}`);
    });

  } catch (error) {
    console.error('❌ Error seeding GRO data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding
if (require.main === module) {
  connectDB().then(() => {
    seedGroData();
  });
}

module.exports = seedGroData; 