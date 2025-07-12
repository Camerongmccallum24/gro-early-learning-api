// Mock data for jobs to replace backend API calls
export interface Job {
  _id: string;
  title: string;
  description: string;
  summary?: string;
  requirements: string[];
  responsibilities: string[];
  qualifications: string[];
  skills: {
    required: Array<{
      name: string;
      level: "beginner" | "intermediate" | "advanced" | "expert";
      priority: "must-have" | "nice-to-have";
    }>;
    preferred: Array<{
      name: string;
      level: "beginner" | "intermediate" | "advanced" | "expert";
    }>;
  };
  experience: {
    min: number;
    max?: number;
    level:
      | "entry"
      | "junior"
      | "mid"
      | "senior"
      | "lead"
      | "principal"
      | "executive";
  };
  salary: {
    min?: number;
    max?: number;
    currency: string;
    period: "hourly" | "monthly" | "yearly";
    isNegotiable: boolean;
    showRange: boolean;
  };
  location: {
    type: "onsite" | "remote" | "hybrid";
    city?: string;
    state?: string;
    country?: string;
  };
  employment: {
    type:
      | "full-time"
      | "part-time"
      | "contract"
      | "freelance"
      | "internship"
      | "temporary";
    hoursPerWeek?: number;
  };
  company: string;
  status: "draft" | "active" | "paused" | "filled" | "cancelled" | "expired";
  priority?: "low" | "medium" | "high" | "urgent";
  applicationDeadline?: string;
  startDate?: string;
  benefits?: Array<{
    category: string;
    name: string;
    description: string;
  }>;
  stats: {
    views: number;
    applications: number;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const mockJobs: Job[] = [
  {
    _id: "1",
    title: "Early Childhood Educator",
    description:
      "Join our team as an Early Childhood Educator and make a difference in young children's lives. We are looking for a passionate and qualified educator to provide high-quality care and education to children aged 6 weeks to 6 years.",
    summary: "Full-time Early Childhood Educator position in Mount Isa",
    requirements: [
      "Certificate III in Early Childhood Education and Care",
      "Experience working with children aged 0-6 years",
      "Strong communication and interpersonal skills",
      "Understanding of child development principles",
    ],
    responsibilities: [
      "Plan and implement age-appropriate learning activities",
      "Observe and document children's development",
      "Maintain a safe and nurturing environment",
      "Communicate effectively with families and colleagues",
      "Follow all childcare regulations and policies",
    ],
    qualifications: [
      "Certificate III in Early Childhood Education and Care (minimum)",
      "Current First Aid and CPR certification",
      "Working with Children Check (Blue Card)",
      "Diploma in Early Childhood Education and Care preferred",
    ],
    skills: {
      required: [
        {
          name: "Child Development",
          level: "intermediate",
          priority: "must-have",
        },
        { name: "Communication", level: "advanced", priority: "must-have" },
        {
          name: "Curriculum Planning",
          level: "intermediate",
          priority: "must-have",
        },
      ],
      preferred: [
        { name: "Creative Arts", level: "intermediate" },
        { name: "Outdoor Education", level: "intermediate" },
      ],
    },
    experience: {
      min: 1,
      max: 3,
      level: "junior",
    },
    salary: {
      min: 55000,
      max: 65000,
      currency: "AUD",
      period: "yearly",
      isNegotiable: true,
      showRange: true,
    },
    location: {
      type: "onsite",
      city: "Mount Isa",
      state: "Queensland",
      country: "Australia",
    },
    employment: {
      type: "full-time",
      hoursPerWeek: 38,
    },
    company: "GRO Early Learning",
    status: "active",
    priority: "high",
    applicationDeadline: "2025-08-15",
    startDate: "2025-09-01",
    benefits: [
      {
        category: "Health",
        name: "Health Insurance",
        description: "Comprehensive health coverage",
      },
      {
        category: "Development",
        name: "Professional Development",
        description: "Ongoing training and development opportunities",
      },
      {
        category: "Work-Life",
        name: "Flexible Hours",
        description: "Flexible working arrangements available",
      },
    ],
    stats: {
      views: 245,
      applications: 18,
    },
    tags: ["Early Childhood", "Education", "Full-time", "Mount Isa"],
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
  },
  {
    _id: "2",
    title: "Centre Director",
    description:
      "We are seeking an experienced Centre Director to lead our Moranbah early learning centre. This is an exciting opportunity to shape the future of early childhood education in a mining community.",
    summary: "Leadership position for experienced early childhood professional",
    requirements: [
      "Diploma in Early Childhood Education and Care",
      "Minimum 3 years leadership experience in early childhood",
      "Strong business acumen and financial management skills",
      "Excellent communication and people management skills",
    ],
    responsibilities: [
      "Oversee daily operations of the centre",
      "Lead and mentor a team of educators",
      "Ensure compliance with all regulatory requirements",
      "Develop and maintain relationships with families",
      "Manage budgets and financial performance",
      "Implement quality improvement initiatives",
    ],
    qualifications: [
      "Diploma in Early Childhood Education and Care (minimum)",
      "Bachelor's degree in Early Childhood preferred",
      "Current First Aid and CPR certification",
      "Working with Children Check (Blue Card)",
      "Management qualification preferred",
    ],
    skills: {
      required: [
        { name: "Leadership", level: "advanced", priority: "must-have" },
        {
          name: "Financial Management",
          level: "intermediate",
          priority: "must-have",
        },
        { name: "Staff Management", level: "advanced", priority: "must-have" },
        { name: "Compliance", level: "advanced", priority: "must-have" },
      ],
      preferred: [
        { name: "Strategic Planning", level: "intermediate" },
        { name: "Marketing", level: "intermediate" },
      ],
    },
    experience: {
      min: 5,
      max: 10,
      level: "senior",
    },
    salary: {
      min: 75000,
      max: 90000,
      currency: "AUD",
      period: "yearly",
      isNegotiable: true,
      showRange: true,
    },
    location: {
      type: "onsite",
      city: "Moranbah",
      state: "Queensland",
      country: "Australia",
    },
    employment: {
      type: "full-time",
      hoursPerWeek: 40,
    },
    company: "GRO Early Learning",
    status: "active",
    priority: "urgent",
    applicationDeadline: "2025-08-01",
    startDate: "2025-08-15",
    benefits: [
      {
        category: "Health",
        name: "Health Insurance",
        description: "Comprehensive health coverage",
      },
      {
        category: "Development",
        name: "Professional Development",
        description: "Leadership development programs",
      },
      {
        category: "Financial",
        name: "Performance Bonus",
        description: "Annual performance-based bonus",
      },
      {
        category: "Relocation",
        name: "Relocation Package",
        description: "Comprehensive relocation assistance",
      },
    ],
    stats: {
      views: 156,
      applications: 8,
    },
    tags: ["Leadership", "Management", "Early Childhood", "Moranbah"],
    createdAt: "2025-01-10T14:30:00Z",
    updatedAt: "2025-01-10T14:30:00Z",
  },
  {
    _id: "3",
    title: "Educational Leader",
    description:
      "Join our Charters Towers centre as an Educational Leader and help drive curriculum development and educational excellence. This role is perfect for an experienced educator ready to take the next step in their career.",
    summary: "Educational leadership role in Charters Towers",
    requirements: [
      "Diploma in Early Childhood Education and Care",
      "Experience in curriculum development and implementation",
      "Strong mentoring and coaching skills",
      "Knowledge of National Quality Standards",
    ],
    responsibilities: [
      "Lead curriculum development and implementation",
      "Mentor and support educators",
      "Ensure educational programs meet quality standards",
      "Conduct staff training and professional development",
      "Collaborate with families on children's learning outcomes",
    ],
    qualifications: [
      "Diploma in Early Childhood Education and Care (minimum)",
      "Bachelor's degree in Early Childhood preferred",
      "Current First Aid and CPR certification",
      "Working with Children Check (Blue Card)",
    ],
    skills: {
      required: [
        {
          name: "Curriculum Development",
          level: "advanced",
          priority: "must-have",
        },
        { name: "Mentoring", level: "advanced", priority: "must-have" },
        {
          name: "Quality Assurance",
          level: "intermediate",
          priority: "must-have",
        },
      ],
      preferred: [
        { name: "Training Delivery", level: "intermediate" },
        { name: "Assessment", level: "intermediate" },
      ],
    },
    experience: {
      min: 3,
      max: 7,
      level: "mid",
    },
    salary: {
      min: 65000,
      max: 75000,
      currency: "AUD",
      period: "yearly",
      isNegotiable: true,
      showRange: true,
    },
    location: {
      type: "onsite",
      city: "Charters Towers",
      state: "Queensland",
      country: "Australia",
    },
    employment: {
      type: "full-time",
      hoursPerWeek: 38,
    },
    company: "GRO Early Learning",
    status: "active",
    priority: "medium",
    applicationDeadline: "2025-08-30",
    startDate: "2025-09-15",
    benefits: [
      {
        category: "Health",
        name: "Health Insurance",
        description: "Comprehensive health coverage",
      },
      {
        category: "Development",
        name: "Professional Development",
        description: "Ongoing training and development opportunities",
      },
      {
        category: "Work-Life",
        name: "Flexible Hours",
        description: "Flexible working arrangements available",
      },
    ],
    stats: {
      views: 189,
      applications: 12,
    },
    tags: ["Educational Leader", "Curriculum", "Mentoring", "Charters Towers"],
    createdAt: "2025-01-12T09:15:00Z",
    updatedAt: "2025-01-12T09:15:00Z",
  },
  {
    _id: "4",
    title: "Assistant Educator",
    description:
      "Start your career in early childhood education as an Assistant Educator. This is a great opportunity for someone passionate about working with children and looking to gain experience in a supportive environment.",
    summary: "Entry-level position for aspiring early childhood educators",
    requirements: [
      "Certificate III in Early Childhood Education and Care (or willing to complete)",
      "Passion for working with children",
      "Good communication skills",
      "Reliable and punctual",
    ],
    responsibilities: [
      "Assist qualified educators in daily activities",
      "Support children's learning and development",
      "Maintain a clean and safe environment",
      "Participate in team meetings and training",
      "Help with administrative tasks as needed",
    ],
    qualifications: [
      "Certificate III in Early Childhood Education and Care (or enrollment)",
      "Current First Aid and CPR certification",
      "Working with Children Check (Blue Card)",
    ],
    skills: {
      required: [
        { name: "Child Care", level: "beginner", priority: "must-have" },
        { name: "Communication", level: "intermediate", priority: "must-have" },
        { name: "Teamwork", level: "intermediate", priority: "must-have" },
      ],
      preferred: [
        { name: "Creative Activities", level: "beginner" },
        { name: "Outdoor Play", level: "beginner" },
      ],
    },
    experience: {
      min: 0,
      max: 2,
      level: "entry",
    },
    salary: {
      min: 45000,
      max: 52000,
      currency: "AUD",
      period: "yearly",
      isNegotiable: true,
      showRange: true,
    },
    location: {
      type: "onsite",
      city: "Mount Isa",
      state: "Queensland",
      country: "Australia",
    },
    employment: {
      type: "full-time",
      hoursPerWeek: 38,
    },
    company: "GRO Early Learning",
    status: "active",
    priority: "medium",
    applicationDeadline: "2025-09-15",
    startDate: "2025-10-01",
    benefits: [
      {
        category: "Health",
        name: "Health Insurance",
        description: "Comprehensive health coverage",
      },
      {
        category: "Development",
        name: "Professional Development",
        description: "Support for qualification completion",
      },
      {
        category: "Work-Life",
        name: "Flexible Hours",
        description: "Flexible working arrangements available",
      },
    ],
    stats: {
      views: 312,
      applications: 25,
    },
    tags: ["Entry Level", "Assistant", "Training", "Mount Isa"],
    createdAt: "2025-01-18T11:45:00Z",
    updatedAt: "2025-01-18T11:45:00Z",
  },
  {
    _id: "5",
    title: "Relief Educator",
    description:
      "Join our relief team and work across multiple GRO Early Learning centres. This casual position offers flexibility while providing valuable experience in different early childhood settings.",
    summary: "Casual relief position across multiple centres",
    requirements: [
      "Certificate III in Early Childhood Education and Care",
      "Flexibility to work across different locations",
      "Ability to adapt quickly to different environments",
      "Reliable transport",
    ],
    responsibilities: [
      "Provide relief coverage across multiple centres",
      "Maintain continuity of care and education",
      "Follow individual centre policies and procedures",
      "Build positive relationships with children and families",
      "Complete required documentation and reports",
    ],
    qualifications: [
      "Certificate III in Early Childhood Education and Care (minimum)",
      "Current First Aid and CPR certification",
      "Working with Children Check (Blue Card)",
    ],
    skills: {
      required: [
        { name: "Adaptability", level: "advanced", priority: "must-have" },
        { name: "Child Care", level: "intermediate", priority: "must-have" },
        { name: "Communication", level: "intermediate", priority: "must-have" },
      ],
      preferred: [
        { name: "Multi-tasking", level: "intermediate" },
        { name: "Problem Solving", level: "intermediate" },
      ],
    },
    experience: {
      min: 1,
      max: 5,
      level: "junior",
    },
    salary: {
      min: 28,
      max: 35,
      currency: "AUD",
      period: "hourly",
      isNegotiable: false,
      showRange: true,
    },
    location: {
      type: "onsite",
      city: "Various",
      state: "Queensland",
      country: "Australia",
    },
    employment: {
      type: "part-time",
      hoursPerWeek: 20,
    },
    company: "GRO Early Learning",
    status: "active",
    priority: "medium",
    applicationDeadline: "2025-12-31",
    startDate: "2025-08-01",
    benefits: [
      {
        category: "Flexibility",
        name: "Flexible Schedule",
        description: "Choose your availability",
      },
      {
        category: "Development",
        name: "Professional Development",
        description: "Exposure to different teaching methods",
      },
      {
        category: "Travel",
        name: "Travel Allowance",
        description: "Mileage reimbursement between centres",
      },
    ],
    stats: {
      views: 203,
      applications: 34,
    },
    tags: ["Casual", "Relief", "Flexible", "Various Locations"],
    createdAt: "2025-01-20T13:20:00Z",
    updatedAt: "2025-01-20T13:20:00Z",
  },
];

// Mock API client functions
export const mockApiClient = {
  getJobs: async (filters?: {
    location?: string;
    type?: string;
    search?: string;
  }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredJobs = mockJobs;

    if (filters?.location) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.location.city
            ?.toLowerCase()
            .includes(filters.location!.toLowerCase()) ||
          job.tags.some((tag) =>
            tag.toLowerCase().includes(filters.location!.toLowerCase())
          )
      );
    }

    if (filters?.type) {
      filteredJobs = filteredJobs.filter((job) =>
        job.employment.type.toLowerCase().includes(filters.type!.toLowerCase())
      );
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    return {
      status: "success" as const,
      data: {
        jobs: filteredJobs,
        totalCount: filteredJobs.length,
      },
    };
  },

  getJob: async (id: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const job = mockJobs.find((j) => j._id === id);

    if (!job) {
      return {
        status: "error" as const,
        error: "Job not found",
      };
    }

    return {
      status: "success" as const,
      data: job,
    };
  },
};

// Mock authentication functions
export const isAuthenticated = () => false;
export const getCurrentUser = () => null;
