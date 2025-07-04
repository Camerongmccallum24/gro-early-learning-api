'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiClient, isAuthenticated } from '@/lib/api';
import type { Application, Job } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  ArrowLeft,
  Users, 
  Search, 
  Filter,
  MoreVertical,
  Eye,
  MessageSquare,
  Calendar,
  Download,
  Clock,
  Mail,
  Phone,
  MapPin,
  FileText,
  Calendar as CalendarIcon
} from 'lucide-react';
import Link from 'next/link';
import ApplicationDetailModal from '@/components/ApplicationDetailModal';

const statusColors = {
  submitted: 'bg-blue-100 text-blue-800 border-blue-200',
  reviewing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  shortlisted: 'bg-green-100 text-green-800 border-green-200',
  interviewing: 'bg-purple-100 text-purple-800 border-purple-200',
  offered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  hired: 'bg-green-200 text-green-900 border-green-300',
  rejected: 'bg-red-100 text-red-800 border-red-200'
};

export default function JobApplicationsPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    
    fetchJobAndApplications();
  }, []);

  const fetchJobAndApplications = async () => {
    try {
      setLoading(true);
      
      // Get user data first to check permissions
      const userResponse = await apiClient.getCurrentUser();
      if (userResponse.status === 'success' && userResponse.data) {
        if (userResponse.data.role === 'candidate') {
          router.push('/dashboard');
          return;
        }
      }

      // Fetch job details
      const jobResponse = await apiClient.getJob(jobId);
      if (jobResponse.status === 'success' && jobResponse.data) {
        setJob(jobResponse.data);
      }

      // Fetch applications
      await fetchApplications();
    } catch (err) {
      console.log('Failed to load data:', err);
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await apiClient.getJobApplications(jobId, filters);
      
      if (response.status === 'success' && response.data) {
        setApplications(response.data.applications || []);
      } else {
        setError(response.error || 'Failed to fetch applications');
        setApplications([]);
      }
    } catch {
      setError('Network error occurred');
      setApplications([]);
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const applyFilters = () => {
    fetchApplications();
  };

  const handleStatusChange = async (applicationId: string, newStatus: Application['status']) => {
    try {
      const response = await apiClient.updateApplicationStatus(applicationId, newStatus);
      if (response.status === 'success') {
        setApplications(applications.map(app => 
          app._id === applicationId ? { ...app, status: newStatus } : app
        ));
      } else {
        alert(response.error || 'Failed to update application status');
      }
    } catch {
      alert('Error updating application status');
    }
  };

  const handleBulkStatusUpdate = async (status: Application['status']) => {
    if (selectedApplications.length === 0) {
      alert('Please select applications to update');
      return;
    }

    try {
      const updates = selectedApplications.map(id => ({ applicationId: id, status }));
      const response = await apiClient.bulkUpdateApplications(updates);
      
      if (response.status === 'success') {
        setApplications(applications.map(app => 
          selectedApplications.includes(app._id) ? { ...app, status } : app
        ));
        setSelectedApplications([]);
      } else {
        alert('Failed to update applications');
      }
    } catch {
      alert('Error updating applications');
    }
  };

  const handleExportApplications = async (format: 'csv' | 'xlsx' = 'csv') => {
    try {
      const response = await apiClient.exportApplications(format, { job: jobId, ...filters });
      
      if (response.status === 'success' && response.data?.downloadUrl) {
        // Create a temporary download link
        const link = document.createElement('a');
        link.href = response.data.downloadUrl;
        link.download = `applications-${job?.title || 'job'}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('Failed to export applications');
      }
    } catch {
      alert('Error exporting applications');
    }
  };

  const toggleApplicationSelection = (applicationId: string) => {
    setSelectedApplications(prev => 
      prev.includes(applicationId) 
        ? prev.filter(id => id !== applicationId)
        : [...prev, applicationId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedApplications.length === applications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(applications.map(app => app._id));
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getCandidateInfo = (application: Application) => {
    const candidate = typeof application.candidate === 'object' ? application.candidate : null;
    return {
      name: candidate?.profile?.firstName && candidate?.profile?.lastName 
        ? `${candidate.profile.firstName} ${candidate.profile.lastName}`
        : 'Unknown Candidate',
      email: candidate?.email || 'No email',
      phone: candidate?.profile?.phone || 'No phone'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gro-teal mx-auto mb-4"></div>
            <p className="text-gro-gray">Loading applications...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="secondary" size="sm" asChild>
                <Link href="/admin/jobs">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Jobs
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gro-darkblue">
                  Applications
                </h1>
                <p className="text-gro-gray mt-2">
                  {job?.title || 'Job Position'} • {applications.length} applications
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => handleExportApplications('csv')}
                  variant="secondary"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                
                {selectedApplications.length > 0 && (
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => handleBulkStatusUpdate(e.target.value as Application['status'])}
                      className="text-sm border border-gray-300 rounded px-3 py-2 bg-white"
                      defaultValue=""
                    >
                      <option value="" disabled>Bulk Actions</option>
                      <option value="reviewing">Mark as Reviewing</option>
                      <option value="shortlisted">Mark as Shortlisted</option>
                      <option value="interviewing">Mark as Interviewing</option>
                      <option value="rejected">Mark as Rejected</option>
                    </select>
                    <span className="text-sm text-gray-600">
                      ({selectedApplications.length} selected)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Summary Card */}
          {job && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gro-teal" />
                    <span className="text-sm text-gray-600">
                      {job.location?.city}, {job.location?.state || 'QLD'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gro-teal" />
                    <span className="text-sm text-gray-600">
                      {job.employment?.type || 'Full-time'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gro-teal" />
                    <span className="text-sm text-gray-600">
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gro-teal" />
                    <span className="text-sm text-gray-600">
                      {applications.length} applicants
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gro-teal focus:border-transparent"
                  />
                </div>
                
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gro-teal focus:border-transparent"
                >
                  <option value="">All Statuses</option>
                  <option value="submitted">Submitted</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offered">Offered</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
                
                <Button onClick={applyFilters} className="w-full" variant="secondary">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="selectAll"
                    checked={selectedApplications.length === applications.length && applications.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 text-gro-teal focus:ring-gro-teal border-gray-300 rounded"
                  />
                  <label htmlFor="selectAll" className="ml-2 text-sm text-gray-700">
                    Select All
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          {error && (
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-600">Error: {error}</p>
                <Button onClick={fetchApplications} variant="secondary" className="mt-4">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {applications.length === 0 && !error ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600 mb-6">
                  {filters.status || filters.search ? 'No applications match your current filters.' : 'This job hasn\'t received any applications yet.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => {
                const candidateInfo = getCandidateInfo(application);
                
                return (
                  <Card key={application._id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedApplications.includes(application._id)}
                            onChange={() => toggleApplicationSelection(application._id)}
                            className="h-4 w-4 text-gro-teal focus:ring-gro-teal border-gray-300 rounded mt-1"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold text-gro-darkblue">
                                {candidateInfo.name}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[application.status]}`}>
                                {formatStatus(application.status)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <Mail className="h-4 w-4 mr-2" />
                                {candidateInfo.email}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Phone className="h-4 w-4 mr-2" />
                                {candidateInfo.phone}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                Applied {new Date(application.submittedAt).toLocaleDateString()}
                              </div>
                            </div>

                            {application.coverLetter && (
                              <div className="mb-4">
                                <p className="text-sm text-gray-700 line-clamp-2">
                                  <span className="font-medium">Cover Letter:</span> {application.coverLetter}
                                </p>
                              </div>
                            )}

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              {application.interviews && application.interviews.length > 0 && (
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {application.interviews.length} interview{application.interviews.length !== 1 ? 's' : ''}
                                </div>
                              )}
                              {application.notes && application.notes.length > 0 && (
                                <div className="flex items-center">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  {application.notes.length} note{application.notes.length !== 1 ? 's' : ''}
                                </div>
                              )}
                              {application.resume && (
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Resume attached
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="ml-6 flex items-center gap-2">
                          {/* Status Change Dropdown */}
                          <select
                            value={application.status}
                            onChange={(e) => handleStatusChange(application._id, e.target.value as Application['status'])}
                            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                          >
                            <option value="submitted">Submitted</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="offered">Offered</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                          </select>

                          {/* Action Buttons */}
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setShowApplicationModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      
      <Footer />

      {/* Application Detail Modal */}
      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          isOpen={showApplicationModal}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedApplication(null);
          }}
          onUpdate={(updatedApplication) => {
            setApplications(applications.map(app => 
              app._id === updatedApplication._id ? updatedApplication : app
            ));
            setSelectedApplication(updatedApplication);
          }}
        />
      )}
    </div>
  );
} 