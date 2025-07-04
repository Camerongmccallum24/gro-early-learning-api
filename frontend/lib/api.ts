// API Client for GRO Early Learning ATS Backend
// Handles authentication, jobs, applications, and user management

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

// Types for API responses
export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  _id: string;
  email: string;
  role: 'recruiter' | 'candidate' | 'admin' | 'hr_manager';
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
    company?: string;
    jobTitle?: string;
    skills?: Array<{
      name: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      yearsOfExperience?: number;
    }>;
    expectedSalary?: {
      min: number;
      max: number;
      currency: string;
    };
    availability?: 'immediate' | '2weeks' | '1month' | '3months' | 'not_available';
  };
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

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
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      priority: 'must-have' | 'nice-to-have';
    }>;
    preferred: Array<{
      name: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    }>;
  };
  experience: {
    min: number;
    max?: number;
    level: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'principal' | 'executive';
  };
  salary: {
    min?: number;
    max?: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
    isNegotiable: boolean;
    showRange: boolean;
  };
  location: {
    type: 'onsite' | 'remote' | 'hybrid';
    city?: string;
    state?: string;
    country?: string;
  };
  employment: {
    type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship' | 'temporary';
    hoursPerWeek?: number;
  };
  company: string;
  status: 'draft' | 'active' | 'paused' | 'filled' | 'cancelled' | 'expired';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
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

export interface Application {
  _id: string;
  job: string | Job;
  candidate: string | User;
  status: 'submitted' | 'reviewing' | 'shortlisted' | 'interviewing' | 'offered' | 'hired' | 'rejected';
  coverLetter?: string;
  resume?: {
    filename: string;
    path: string;
  };
  questionnaire?: Array<{
    question: string;
    answer: string;
  }>;
  interviews?: Array<{
    type: 'phone' | 'video' | 'onsite' | 'group';
    scheduledDate: string;
    duration?: number;
    location?: string;
    meetingLink?: string;
    interviewers: Array<{
      interviewer: string | User;
      isPrimary: boolean;
    }>;
    notes?: string;
    feedback?: {
      score: number;
      strengths?: string[];
      weaknesses?: string[];
      notes?: string;
      recommendation: 'hire' | 'reject' | 'proceed_next_round' | 'hold';
      submittedBy: string | User;
      submittedAt: string;
    };
    status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
    createdAt: string;
  }>;
  notes?: Array<{
    note: string;
    addedBy: string | User;
    addedAt: string;
  }>;
  screening?: {
    score?: number;
    notes?: string;
    status: 'pending' | 'passed' | 'failed';
  };
  submittedAt: string;
  updatedAt: string;
}

// API Client Class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Make authenticated API request
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          status: 'error',
          error: data.message || `HTTP ${response.status}`,
        };
      }

      return {
        status: 'success',
        data,
      };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Authentication Methods
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 'success' && response.data) {
      // Backend returns: { status: 'success', token: '...', data: { user: {...} } }
      // Extract token from top level and user from data.user
      const token = response.data.token;
      const user = response.data.data?.user;
      
      if (token) {
        this.setToken(token);
        return {
          status: 'success',
          data: { user, token }
        };
      }
    }

    return {
      status: 'error',
      error: response.error || 'Login failed'
    };
  }

  async signup(userData: {
    email: string;
    password: string;
    role: 'recruiter' | 'candidate';
    profile: {
      firstName: string;
      lastName: string;
      phone?: string;
    };
  }): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<any>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.status === 'success' && response.data) {
      // Backend returns: { status: 'success', token: '...', data: { user: {...} } }
      const token = response.data.token;
      const user = response.data.data?.user;
      
      if (token) {
        this.setToken(token);
        return {
          status: 'success',
          data: { user, token }
        };
      }
    }

    return {
      status: 'error',
      error: response.error || 'Registration failed'
    };
  }

  async logout(): Promise<ApiResponse<void>> {
    const response = await this.request<void>('/auth/logout', {
      method: 'POST',
    });
    
    this.clearToken();
    return response;
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await this.request<{ data: { user: User } }>('/auth/me');
    
    // Transform the response to match frontend expectations
    if (response.status === 'success' && response.data) {
      return {
        status: 'success',
        data: response.data.data?.user || response.data
      };
    }
    
    return {
      status: 'error',
      error: response.error || 'Failed to get current user'
    };
  }

  // Job Methods
  async getJobs(filters?: {
    location?: string;
    type?: string;
    level?: string;
    search?: string;
  }): Promise<ApiResponse<{ jobs: Job[]; total: number }>> {
    const queryParams = new URLSearchParams();
    
    if (filters?.location) queryParams.append('location', filters.location);
    if (filters?.type) queryParams.append('type', filters.type);
    if (filters?.level) queryParams.append('level', filters.level);
    if (filters?.search) queryParams.append('search', filters.search);

    const endpoint = `/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await this.request<any>(endpoint);

    if (response.status === 'success' && response.data) {
      // Handle backend response structure: {status: 'success', data: {jobs: []}}
      return {
        status: 'success',
        data: {
          jobs: response.data.data?.jobs || [],
          total: response.data.totalResults || 0
        }
      };
    }

    return {
      status: 'error',
      error: response.error || 'Failed to fetch jobs'
    };
  }

  async getMyJobs(filters?: {
    status?: string;
    search?: string;
  }): Promise<ApiResponse<{ jobs: Job[]; total: number }>> {
    const queryParams = new URLSearchParams();
    
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.search) queryParams.append('search', filters.search);

    const endpoint = `/jobs/my/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await this.request<any>(endpoint);

    if (response.status === 'success' && response.data) {
      return {
        status: 'success',
        data: {
          jobs: response.data.data?.jobs || [],
          total: response.data.results || 0
        }
      };
    }

    return {
      status: 'error',
      error: response.error || 'Failed to fetch my jobs'
    };
  }

  async getJob(id: string): Promise<ApiResponse<Job>> {
    const response = await this.request<any>(`/jobs/${id}`);
    
    if (response.status === 'success' && response.data) {
      // Handle backend response structure: {status: 'success', data: {job: {...}}}
      return {
        status: 'success',
        data: response.data.data?.job || response.data.job
      };
    }

    return {
      status: 'error',
      error: response.error || 'Failed to fetch job'
    };
  }

  async createJob(jobData: Partial<Job>): Promise<ApiResponse<Job>> {
    const response = await this.request<any>('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });

    if (response.status === 'success' && response.data) {
      return {
        status: 'success',
        data: response.data.data?.job || response.data.job
      };
    }

    return {
      status: 'error',
      error: response.error || 'Failed to create job'
    };
  }

  async updateJob(id: string, jobData: Partial<Job>): Promise<ApiResponse<Job>> {
    const response = await this.request<any>(`/jobs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(jobData),
    });

    if (response.status === 'success' && response.data) {
      return {
        status: 'success',
        data: response.data.data?.job || response.data.job
      };
    }

    return {
      status: 'error',
      error: response.error || 'Failed to update job'
    };
  }

  async updateJobStatus(id: string, status: Job['status']): Promise<ApiResponse<Job>> {
    const response = await this.request<any>(`/jobs/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });

    if (response.status === 'success' && response.data) {
      return {
        status: 'success',
        data: response.data.data?.job || response.data.job
      };
    }

    return {
      status: 'error',
      error: response.error || 'Failed to update job status'
    };
  }

  async deleteJob(id: string): Promise<ApiResponse<void>> {
    const response = await this.request<void>(`/jobs/${id}`, {
      method: 'DELETE',
    });

    return response;
  }

  async getJobApplications(jobId: string, filters?: {
    status?: string;
  }): Promise<ApiResponse<{ applications: Application[]; total: number }>> {
    const queryParams = new URLSearchParams();
    
    if (filters?.status) queryParams.append('status', filters.status);

    const endpoint = `/jobs/${jobId}/applications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await this.request<{ data: { applications: Application[] }; results: number }>(endpoint);

    if (response.status === 'success' && response.data) {
      return {
        status: 'success',
        data: {
          applications: response.data.data?.applications || [],
          total: response.data.results || 0
        }
      };
    }

    return {
      status: 'error',
      error: response.error || 'Failed to fetch job applications'
    };
  }

  // Application Methods
  async getApplications(filters?: {
    job?: string;
    status?: string;
  }): Promise<ApiResponse<{ applications: Application[]; total: number }>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    const queryString = params.toString();
    const endpoint = queryString ? `/applications?${queryString}` : '/applications';
    
    const response = await this.request<{ data: { applications: Application[] }; totalResults: number }>(endpoint);
    
    // Transform the response to match frontend expectations
    if (response.status === 'success' && response.data) {
      return {
        status: 'success',
        data: {
          applications: response.data.data.applications,
          total: response.data.totalResults
        }
      };
    }
    
    // Return error response
    return {
      status: 'error',
      error: response.error || 'Failed to fetch applications'
    };
  }

  async getApplication(id: string): Promise<ApiResponse<Application>> {
    return this.request<Application>(`/applications/${id}`);
  }

  async submitApplication(jobId: string, applicationData: {
    coverLetter?: string;
    questionnaire?: Array<{ question: string; answer: string }>;
  }): Promise<ApiResponse<Application>> {
    const response = await this.request<{ data: { application: Application } }>(`/applications/jobs/${jobId}/apply`, {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
    
    // Transform the response to match frontend expectations
    if (response.status === 'success' && response.data) {
      return {
        status: 'success',
        data: response.data.data.application
      };
    }
    
    // Return error response
    return {
      status: 'error',
      error: response.error || 'Failed to submit application'
    };
  }

  async updateApplicationStatus(id: string, status: Application['status']): Promise<ApiResponse<Application>> {
    return this.request<Application>(`/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async addApplicationNote(id: string, note: string): Promise<ApiResponse<Application>> {
    return this.request<Application>(`/applications/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ note }),
    });
  }

  async scheduleInterview(id: string, interviewData: {
    type: 'phone' | 'video' | 'onsite' | 'group';
    scheduledDate: string;
    duration?: number;
    location?: string;
    meetingLink?: string;
    interviewers?: Array<{ interviewer: string; isPrimary: boolean }>;
    notes?: string;
  }): Promise<ApiResponse<Application>> {
    return this.request<Application>(`/applications/${id}/interviews`, {
      method: 'POST',
      body: JSON.stringify(interviewData),
    });
  }

  async submitInterviewFeedback(id: string, interviewIndex: number, feedback: {
    score: number;
    strengths?: string[];
    weaknesses?: string[];
    notes?: string;
    recommendation: 'hire' | 'reject' | 'proceed_next_round' | 'hold';
  }): Promise<ApiResponse<Application>> {
    return this.request<Application>(`/applications/${id}/interviews/${interviewIndex}/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  }

  async bulkUpdateApplications(updates: Array<{
    applicationId: string;
    status: Application['status'];
  }>): Promise<ApiResponse<{ updated: number }>> {
    return this.request<{ updated: number }>('/applications/bulk-update', {
      method: 'PATCH',
      body: JSON.stringify({ updates }),
    });
  }

  async exportApplications(format: 'csv' | 'xlsx' = 'csv', filters?: {
    job?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ApiResponse<{ downloadUrl: string }>> {
    const params = new URLSearchParams();
    params.append('format', format);
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    return this.request<{ downloadUrl: string }>(`/applications/export?${params.toString()}`);
  }

  async getApplicationStats(): Promise<ApiResponse<{
    statusBreakdown: Array<{ _id: string; count: number; avgScore?: number }>;
    overview: { avgTimeToHire: number; totalApplications: number };
    monthlyTrend: Array<{ _id: { year: number; month: number }; count: number }>;
  }>> {
    return this.request<{
      statusBreakdown: Array<{ _id: string; count: number; avgScore?: number }>;
      overview: { avgTimeToHire: number; totalApplications: number };
      monthlyTrend: Array<{ _id: { year: number; month: number }; count: number }>;
    }>('/applications/stats');
  }

  // File Upload Methods
  async uploadResume(file: File): Promise<ApiResponse<{ filename: string; path: string }>> {
    const formData = new FormData();
    formData.append('resume', file);

    const url = `${this.baseURL}/users/upload-resume`;
    const headers: HeadersInit = {};

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          status: 'error',
          error: data.message || `HTTP ${response.status}`,
        };
      }

      return {
        status: 'success',
        data,
      };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Health Check
  async healthCheck(): Promise<ApiResponse<{ message: string; timestamp: string }>> {
    return this.request<{ message: string; timestamp: string }>('/health');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export utility functions
export const isAuthenticated = (): boolean => {
  return apiClient['token'] !== null;
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

export default apiClient; 