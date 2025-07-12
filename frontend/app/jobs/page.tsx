'use client';

import { useEffect, useState } from 'react';
import { mockApiClient } from '@/data/mockJobsData';
import type { Job } from '@/data/mockJobsData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { MapPin, Clock, DollarSign, Briefcase, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    search: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await mockApiClient.getJobs(filters);

      if (response.status === 'success' && response.data && response.data.jobs) {
        setJobs(Array.isArray(response.data.jobs) ? response.data.jobs : []);
      } else {
        setError(response.error || 'Failed to fetch jobs');
        setJobs([]); // Ensure jobs is always an array
      }
    } catch (err) {
      setError('Network error occurred');
      setJobs([]); // Ensure jobs is always an array
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const applyFilters = () => {
    fetchJobs();
  };

  const getLocationColor = (city: string) => {
    switch (city.toLowerCase()) {
      case 'mount isa':
        return 'text-gro-mount-isa';
      case 'moranbah':
        return 'text-gro-moranbah';
      case 'charters towers':
        return 'text-gro-charters-towers';
      default:
        return 'text-gro-teal';
    }
  };

  const formatSalary = (job: Job) => {
    if (!job?.salary?.showRange) return 'Competitive';

    const { min, max, currency, period } = job.salary;
    const formatAmount = (amount: number) =>
      new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: currency || 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);

    if (min && max) {
      return `${formatAmount(min)} - ${formatAmount(max)} ${period || 'annually'}`;
    } else if (min) {
      return `${formatAmount(min)}+ ${period || 'annually'}`;
    }

    return 'Competitive';
  };

  const getLocationBadgeClasses = (city: string) => {
    switch (city.toLowerCase()) {
      case 'mount isa':
        return 'bg-gro-mount-isa/10 text-gro-mount-isa border-gro-mount-isa/20';
      case 'moranbah':
        return 'bg-gro-moranbah/10 text-gro-moranbah border-gro-moranbah/20';
      case 'charters towers':
        return 'bg-gro-charters-towers/10 text-gro-charters-towers border-gro-charters-towers/20';
      default:
        return 'bg-gro-teal/10 text-gro-teal border-gro-teal/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gro-teal mx-auto mb-4"></div>
            <p className="text-gro-gray">Loading current opportunities...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading jobs: {error}</p>
            <Button onClick={fetchJobs} variant="gro">
              Try Again
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gro-teal/10 to-gro-green/10 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gro-darkblue mb-6">
                Current Career Opportunities
              </h1>
              <p className="text-lg sm:text-xl text-gro-gray leading-relaxed mb-8">
                Join our passionate team across Queensland's mining communities and make a meaningful
                impact in early childhood education.
              </p>

              {/* Search and Filters */}
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gro-teal focus:border-transparent"
                    />
                  </div>

                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gro-teal focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    <option value="Mount Isa">Mount Isa</option>
                    <option value="Moranbah">Moranbah</option>
                    <option value="Charters Towers">Charters Towers</option>
                  </select>

                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gro-teal focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>

                  <Button onClick={applyFilters} className="w-full" variant="gro">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter Jobs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jobs Listing */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {!jobs || jobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
                <p className="text-gray-500">Try adjusting your search filters or check back later for new opportunities.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gro-darkblue mb-2">
                    {jobs?.length || 0} Position{(jobs?.length || 0) !== 1 ? 's' : ''} Available
                  </h2>
                  <p className="text-gro-gray">Find your perfect role in early childhood education</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {jobs?.map((job) => (
                    <Card key={job._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl font-semibold text-gro-darkblue line-clamp-2">
                            {job.title}
                          </CardTitle>
                          {job.priority === 'urgent' && (
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                              Urgent
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full border ${getLocationBadgeClasses(job.location?.city || '')}`}>
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location?.city}, {job.location?.state}
                          </span>

                          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                            {job.employment?.type}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {job.summary || job.description.substring(0, 150) + '...'}
                        </p>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-gro-teal" />
                            <span>{formatSalary(job)}</span>
                          </div>

                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2 text-gro-teal" />
                            <span>{job.experience?.level} level ({job.experience?.min}+ years)</span>
                          </div>

                          {job.applicationDeadline && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gro-orange" />
                              <span>
                                Apply by {new Date(job.applicationDeadline).toLocaleDateString('en-AU')}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1 mt-4">
                          {job.skills?.required?.slice(0, 3)?.map((skill, index) => (
                            <span key={index} className="bg-gro-teal/10 text-gro-teal text-xs px-2 py-1 rounded">
                              {skill?.name}
                            </span>
                          ))}
                          {(job.skills?.required?.length || 0) > 3 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                              +{(job.skills?.required?.length || 0) - 3} more
                            </span>
                          )}
                        </div>

                        <div className="pt-4">
                          <Button asChild className="w-full" variant="gro">
                            <Link href={`/jobs/${job._id}`}>
                              View Details & Apply
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-gro-orange/10 to-gro-teal/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gro-darkblue mb-6">
              Ready to Start Your Career Journey?
            </h2>
            <p className="text-lg text-gro-gray mb-8 max-w-2xl mx-auto">
              Join our team and make a meaningful difference in early childhood education
              while enjoying competitive benefits and career growth opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="gro" size="lg">
                <Link href="/about">Learn About GRO</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/benefits">View Benefits</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 