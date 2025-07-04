'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import type { Application } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { CalendarDays, MapPin, Briefcase, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationsList() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getApplications();
      
      if (response.status === 'success' && response.data) {
        setApplications(response.data.applications || []);
      } else {
        setError(response.error || 'Failed to fetch applications');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'interviewing':
        return 'bg-purple-100 text-purple-800';
      case 'offered':
        return 'bg-emerald-100 text-emerald-800';
      case 'hired':
        return 'bg-green-200 text-green-900';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gro-teal mx-auto mb-2"></div>
        <p className="text-gray-600">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-600 mb-2">Error: {error}</p>
        <Button onClick={fetchApplications} variant="secondary" size="sm">
          Try Again
        </Button>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-6">
        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">No applications yet.</p>
        <p className="text-sm text-gray-500 mb-4">
          Start browsing job opportunities and submit your first application!
        </p>
        <Button asChild variant="gro" size="sm">
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {applications.length} application{applications.length !== 1 ? 's' : ''}
        </p>
        <Button asChild variant="secondary" size="sm">
          <Link href="/jobs">Apply for More</Link>
        </Button>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {applications.map((application) => {
          const job = typeof application.job === 'object' ? application.job : null;
          
          return (
            <Card key={application._id} className="border-l-4 border-l-gro-teal">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gro-darkblue">
                      {job?.title || 'Job Title'}
                    </h4>
                    
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job?.location?.city}, {job?.location?.state}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>Applied {new Date(application.submittedAt).toLocaleDateString('en-AU')}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(application.status)}`}>
                      {formatStatus(application.status)}
                    </span>
                  </div>
                </div>
                
                {application.coverLetter && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {application.coverLetter.substring(0, 100)}
                      {application.coverLetter.length > 100 && '...'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 