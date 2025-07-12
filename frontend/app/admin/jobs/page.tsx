import { redirect } from 'next/navigation';

export default function AdminJobsPage() {
  redirect('/jobs');
}
DollarSign,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

const statusColors = {
  draft: 'bg-gray-100 text-gray-800 border-gray-200',
  active: 'bg-green-100 text-green-800 border-green-200',
  paused: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  filled: 'bg-blue-100 text-blue-800 border-blue-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  expired: 'bg-orange-100 text-orange-800 border-orange-200'
};

export default function AdminJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    fetchUserAndJobs();
  }, []);

  const fetchUserAndJobs = async () => {
    try {
      setLoading(true);

      // Get user data first
      const userResponse = await apiClient.getCurrentUser();
      if (userResponse.status === 'success' && userResponse.data) {
        // Check if user is actually a recruiter/admin
        if (userResponse.data.role === 'candidate') {
          router.push('/dashboard');
          return;
        }
      }

      // Fetch recruiter's jobs
      await fetchJobs();
    } catch (err) {
      console.log('Failed to load data:', err);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await apiClient.getMyJobs(filters);

      if (response.status === 'success' && response.data && response.data.jobs) {
        setJobs(Array.isArray(response.data.jobs) ? response.data.jobs : []);
      } else {
        setError(response.error || 'Failed to fetch jobs');
        setJobs([]);
      }
    } catch {
      setError('Network error occurred');
      setJobs([]);
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

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await apiClient.deleteJob(jobId);
      if (response.status === 'success') {
        setJobs(jobs.filter(job => job._id !== jobId));
      } else {
        alert(response.error || 'Failed to delete job');
      }
    } catch {
      alert('Error deleting job');
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: Job['status']) => {
    try {
      const response = await apiClient.updateJobStatus(jobId, newStatus);
      if (response.status === 'success') {
        setJobs(jobs.map(job =>
          job._id === jobId ? { ...job, status: newStatus } : job
        ));
      } else {
        alert(response.error || 'Failed to update job status');
      }
    } catch {
      alert('Error updating job status');
    }
  };

  const formatSalary = (job: Job) => {
    if (!job?.salary?.showRange) return 'Competitive';

    const { min, max, currency } = job.salary;
    const formatAmount = (amount: number) =>
      new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: currency || 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);

    if (min && max) {
      return `${formatAmount(min)} - ${formatAmount(max)}`;
    } else if (min) {
      return `${formatAmount(min)}+`;
    }

    return 'Competitive';
  };

  const getLocationDisplay = (job: Job) => {
    return job.location?.city ? `${job.location.city}, ${job.location.state || 'QLD'}` : 'Remote';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gro-teal mx-auto mb-4"></div>
            <p className="text-gro-gray">Loading job management...</p>
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gro-darkblue">
                  Job Management
                </h1>
                <p className="text-gro-gray mt-2">
                  Manage your job postings and track applications
                </p>
              </div>
              <Button asChild variant="gro">
                <Link href="/admin/jobs/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Job
                </Link>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gro-teal focus:border-transparent"
                >
                  <option value="">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="filled">Filled</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="expired">Expired</option>
                </select>

                <Button onClick={applyFilters} className="w-full" variant="secondary">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Jobs List */}
          {error && (
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-600">Error: {error}</p>
                <Button onClick={fetchJobs} variant="secondary" className="mt-4">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {jobs.length === 0 && !error ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6">
                  {filters.status || filters.search ? 'No jobs match your current filters.' : 'Start by creating your first job posting.'}
                </p>
                <Button asChild variant="gro">
                  <Link href="/admin/jobs/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Job
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <Card key={job._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold text-gro-darkblue hover:text-gro-teal cursor-pointer">
                            <Link href={`/jobs/${job._id}`}>
                              {job.title}
                            </Link>
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[job.status]}`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {getLocationDisplay(job)}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2" />
                            {formatSalary(job)}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {job.employment?.type || 'Full-time'}
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {job.stats?.views || 0} views
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {job.stats?.applications || 0} applications
                          </div>
                          <div>
                            Created: {new Date(job.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex items-center gap-2">
                        {/* Status Change Dropdown */}
                        <select
                          value={job.status}
                          onChange={(e) => handleStatusChange(job._id, e.target.value as Job['status'])}
                          className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                        >
                          <option value="draft">Draft</option>
                          <option value="active">Active</option>
                          <option value="paused">Paused</option>
                          <option value="filled">Filled</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        {/* Action Buttons */}
                        <Button
                          variant="secondary"
                          size="sm"
                          asChild
                        >
                          <Link href={`/admin/jobs/${job._id}/applications`}>
                            <Users className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          variant="secondary"
                          size="sm"
                          asChild
                        >
                          <Link href={`/admin/jobs/edit/${job._id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleDeleteJob(job._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 