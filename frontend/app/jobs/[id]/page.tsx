'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockApiClient, isAuthenticated } from '@/data/mockJobsData';
import type { Job } from '@/data/mockJobsData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ApplicationModal from '@/components/ApplicationModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Calendar,
  Building,
  Users,
  ArrowLeft,
  CheckCircle,
  Star,
  Award,
  Heart
} from 'lucide-react';
import Link from 'next/link';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await mockApiClient.getJob(jobId);

      if (response.status === 'success' && response.data) {
        setJob(response.data);
      } else {
        setError(response.error || 'Failed to fetch job details');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getLocationColor = (city: string) => {
    switch (city?.toLowerCase()) {
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

  const getLocationBadgeClasses = (city: string) => {
    switch (city?.toLowerCase()) {
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

  const handleApply = () => {
    if (!isAuthenticated()) {
      // Redirect to login with return URL
      router.push(`/auth/login?returnUrl=/jobs/${jobId}`);
      return;
    }

    setShowApplicationModal(true);
  };

  const handleApplicationSuccess = () => {
    // Show success message or redirect to dashboard
    alert('Application submitted successfully! You can track your application status in your dashboard.');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gro-teal mx-auto mb-4"></div>
            <p className="text-gro-gray">Loading job details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error || 'Job not found'}</p>
            <div className="space-x-4">
              <Button onClick={() => router.back()} variant="secondary">
                Go Back
              </Button>
              <Button asChild variant="gro">
                <Link href="/jobs">View All Jobs</Link>
              </Button>
            </div>
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
        {/* Breadcrumb & Back Button */}
        <section className="bg-gray-50 py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.back()}
                variant="secondary"
                size="sm"
                className="inline-flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="text-sm text-gray-500">
                <Link href="/jobs" className="hover:text-gro-teal">Jobs</Link>
                <span className="mx-2">/</span>
                <span>{job.title}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Job Header */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`inline-flex items-center text-sm font-medium px-3 py-1 rounded-full border ${getLocationBadgeClasses(job.location?.city || '')}`}>
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location?.city}, {job.location?.state}
                    </span>

                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                      {job.employment?.type}
                    </span>

                    {job.priority === 'urgent' && (
                      <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-gro-darkblue mb-4">
                    {job.title}
                  </h1>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-gro-teal" />
                      <span>GRO Early Learning</span>
                    </div>

                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-gro-teal" />
                      <span>{formatSalary(job)}</span>
                    </div>

                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-gro-teal" />
                      <span>{job.experience?.level} level</span>
                    </div>

                    {job.applicationDeadline && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gro-orange" />
                        <span>
                          Due {new Date(job.applicationDeadline).toLocaleDateString('en-AU')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {job.summary && (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {job.summary}
                    </p>
                  </div>
                )}
              </div>

              {/* Apply Card */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle className="text-center text-gro-darkblue">
                      Ready to Apply?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={handleApply}
                      disabled={applying}
                      className="w-full"
                      variant="gro"
                      size="lg"
                    >
                      {applying ? 'Processing...' : 'Apply Now'}
                    </Button>

                    <div className="text-center text-sm text-gray-600">
                      <p>Join our passionate team and make a difference in early childhood education!</p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {job.stats?.applications || 0} applicants
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {job.stats?.views || 0} views
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Job Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">

                {/* Job Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-gro-darkblue">
                      <Briefcase className="h-5 w-5 mr-2" />
                      About This Role
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-gro-darkblue">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Key Responsibilities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 mt-1 text-gro-teal flex-shrink-0" />
                            <span className="text-gray-700">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-gro-darkblue">
                        <Star className="h-5 w-5 mr-2" />
                        Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start">
                            <Star className="h-4 w-4 mr-2 mt-1 text-gro-orange flex-shrink-0" />
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Qualifications */}
                {job.qualifications && job.qualifications.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-gro-darkblue">
                        <Award className="h-5 w-5 mr-2" />
                        Qualifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.qualifications.map((qualification, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-4 w-4 mr-2 mt-1 text-gro-green flex-shrink-0" />
                            <span className="text-gray-700">{qualification}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">

                {/* Skills Required */}
                {job.skills?.required && job.skills.required.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-gro-darkblue">Skills Required</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.required.map((skill, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded ${skill.priority === 'must-have'
                                ? 'bg-gro-teal/10 text-gro-teal border border-gro-teal/20'
                                : 'bg-gray-100 text-gray-700 border border-gray-200'
                              }`}
                          >
                            {skill.name}
                            {skill.priority === 'must-have' && <Star className="h-3 w-3 ml-1" />}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-gro-darkblue">Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {job.benefits.map((benefit, index) => (
                          <div key={index} className="border-l-2 border-gro-teal pl-3">
                            <h4 className="font-medium text-gray-900">{benefit.name}</h4>
                            <p className="text-sm text-gray-600">{benefit.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Job Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gro-darkblue">Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience Level:</span>
                      <span className="font-medium">{job.experience?.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Experience:</span>
                      <span className="font-medium">{job.experience?.min}+ years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employment Type:</span>
                      <span className="font-medium">{job.employment?.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location Type:</span>
                      <span className="font-medium">{job.location?.type}</span>
                    </div>
                    {job.startDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="font-medium">
                          {new Date(job.startDate).toLocaleDateString('en-AU')}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-gro-orange/10 to-gro-teal/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gro-darkblue mb-6">
              Ready to Join Our Team?
            </h2>
            <p className="text-lg text-gro-gray mb-8 max-w-2xl mx-auto">
              Take the next step in your early childhood education career and make a meaningful
              difference in the lives of children across Queensland's mining communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleApply}
                disabled={applying}
                variant="gro"
                size="lg"
              >
                {applying ? 'Processing...' : 'Apply for This Position'}
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/jobs">View Other Opportunities</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Application Modal */}
      {job && (
        <ApplicationModal
          job={job}
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
          onSuccess={handleApplicationSuccess}
        />
      )}
    </div>
  );
} 