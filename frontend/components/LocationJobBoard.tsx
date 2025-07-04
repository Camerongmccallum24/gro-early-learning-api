'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import type { Job } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { MapPin, DollarSign, Briefcase, Clock, Users } from 'lucide-react';
import Link from 'next/link';

interface LocationJobBoardProps {
  location: string;
}

const LocationJobBoard: React.FC<LocationJobBoardProps> = ({ location }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, [location]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      
      // Map location IDs to city names for API filtering
      const locationCityMap: Record<string, string> = {
        'mount-isa': 'Mount Isa',
        'moranbah': 'Moranbah',
        'charters-towers': 'Charters Towers'
      };

      const cityName = locationCityMap[location] || location;
      
      const response = await apiClient.getJobs({
        location: cityName
      });
      
      if (response.status === 'success' && response.data) {
        setJobs(response.data.jobs);
      } else {
        setError(response.error || 'Failed to fetch jobs');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (job: Job) => {
    if (!job.salary.showRange) return 'Competitive Package';
    
    const { min, max, currency, period } = job.salary;
    const formatAmount = (amount: number) => 
      new Intl.NumberFormat('en-AU', { 
        style: 'currency', 
        currency: currency || 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);

    if (min && max) {
      return `${formatAmount(min)} - ${formatAmount(max)} ${period}`;
    } else if (min) {
      return `${formatAmount(min)}+ ${period}`;
    }
    
    return 'Competitive Package';
  };

  const getLocationColor = (locationId: string) => {
    switch (locationId) {
      case 'mount-isa':
        return 'text-gro-mount-isa';
      case 'moranbah':
        return 'text-gro-moranbah';
      case 'charters-towers':
        return 'text-gro-charters-towers';
      default:
        return 'text-gro-teal';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gro-teal mx-auto mb-4"></div>
        <p className="text-gro-gray">Loading current opportunities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading jobs: {error}</p>
        <Button onClick={fetchJobs} variant="gro">
          Try Again
        </Button>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No current openings</h3>
        <p className="text-gray-600 mb-6">
          Check our main jobs page for other locations or sign up for alerts when new positions become available.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="gro">
            <Link href="/jobs">View All Jobs</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Get Job Alerts</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gro-darkblue mb-2">
          {jobs.length} Position{jobs.length !== 1 ? 's' : ''} Available
        </h3>
        <p className="text-gro-gray">Current opportunities at this location</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <Card key={job._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg sm:text-xl font-semibold text-gro-darkblue">
                  {job.title}
                </CardTitle>
                {job.priority === 'urgent' && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                    Urgent
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-gray-100 ${getLocationColor(location)}`}>
                  <MapPin className="h-3 w-3 mr-1" />
                  {job.location.city}
                </span>
                
                <span className="bg-gro-teal/10 text-gro-teal text-xs font-medium px-2 py-1 rounded-full">
                  {job.employment.type}
                </span>
                
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {job.experience.level} level
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                {job.summary || job.description.substring(0, 120) + '...'}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2 text-gro-teal" />
                  <span className="font-medium">{formatSalary(job)}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2 text-gro-teal" />
                  <span>{job.experience.min}+ years experience required</span>
                </div>
                
                {job.applicationDeadline && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gro-orange" />
                    <span>
                      Apply by {new Date(job.applicationDeadline).toLocaleDateString('en-AU')}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Key Requirements */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-800">Key Requirements:</h4>
                <div className="flex flex-wrap gap-1">
                  {job.skills.required.slice(0, 3).map((skill, index) => (
                    <span key={index} className="bg-gro-teal/10 text-gro-teal text-xs px-2 py-1 rounded">
                      {skill.name}
                    </span>
                  ))}
                  {job.skills.required.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{job.skills.required.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              {/* Benefits Preview */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-800">Key Benefits:</h4>
                  <div className="text-xs text-gray-600">
                    {job.benefits.slice(0, 2).map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-gro-teal rounded-full mr-2"></span>
                        {benefit.name}
                      </div>
                    ))}
                    {job.benefits.length > 2 && (
                      <div className="text-gray-500 mt-1">+{job.benefits.length - 2} more benefits</div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="pt-4 flex gap-3">
                <Button asChild className="flex-1" variant="gro">
                  <Link href={`/jobs/${job._id}`}>
                    View Details
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/jobs/${job._id}#apply`}>
                    Apply Now
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* View All Jobs Link */}
      <div className="text-center pt-6">
        <Button asChild variant="outline" size="lg">
          <Link href="/jobs">
            <Users className="h-4 w-4 mr-2" />
            View All GRO Positions
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default LocationJobBoard; 