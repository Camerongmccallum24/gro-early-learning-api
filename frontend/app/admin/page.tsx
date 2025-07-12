import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('/contact');
}
thisMonthApplications: 0
  });

useEffect(() => {
  if (!isAuthenticated()) {
    router.push('/auth/login');
    return;
  }
  fetchUserData();
}, []);

const fetchUserData = async () => {
  try {
    const response = await apiClient.getCurrentUser();
    if (response.status === 'success' && response.data) {
      setUser(response.data);

      // Check if user is actually a recruiter/admin
      if (response.data.role === 'candidate') {
        router.push('/dashboard');
        return;
      }

      // Fetch dashboard statistics
      await fetchDashboardStats();
    }
  } catch (err) {
    console.log('Failed to load user data:', err);
  } finally {
    setLoading(false);
  }
};

const fetchDashboardStats = async () => {
  try {
    // Fetch job statistics
    const jobsResponse = await apiClient.getMyJobs();
    const activeJobs = jobsResponse.status === 'success' && jobsResponse.data
      ? jobsResponse.data.jobs.filter(job => job.status === 'active').length
      : 0;

    // Fetch application statistics
    const applicationStatsResponse = await apiClient.getApplicationStats();
    let totalApplications = 0;
    let thisMonthApplications = 0;

    if (applicationStatsResponse.status === 'success' && applicationStatsResponse.data) {
      totalApplications = applicationStatsResponse.data.overview.totalApplications;

      // Calculate this month's applications from monthly trend
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      const currentMonthData = applicationStatsResponse.data.monthlyTrend.find(
        trend => trend._id.month === currentMonth && trend._id.year === currentYear
      );
      thisMonthApplications = currentMonthData?.count || 0;
    }

    setStats({
      activeJobs,
      totalApplications,
      thisMonthApplications
    });
  } catch (err) {
    console.log('Failed to load dashboard statistics:', err);
  }
};

const handleLogout = async () => {
  await apiClient.logout();
  router.push('/');
};

if (loading) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gro-teal mx-auto mb-4"></div>
          <p className="text-gro-gray">Loading admin dashboard...</p>
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

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gro-darkblue">
                Admin Dashboard
              </h1>
              <p className="text-gro-gray mt-2">
                Welcome{user?.profile?.firstName ? `, ${user.profile.firstName}` : ''} - GRO Early Learning Recruiter Portal
              </p>
            </div>
            <Button onClick={handleLogout} variant="secondary" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-gro-darkblue">
                <Briefcase className="h-5 w-5 mr-2" />
                Job Postings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gro-teal mb-2">{stats.activeJobs}</div>
              <p className="text-sm text-gray-600">Active positions</p>
              <Button asChild variant="gro" size="sm" className="w-full mt-3">
                <Link href="/admin/jobs">Manage Jobs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-gro-darkblue">
                <Users className="h-5 w-5 mr-2" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gro-orange mb-2">{stats.totalApplications}</div>
              <p className="text-sm text-gray-600">Total received</p>
              <Button asChild variant="secondary" size="sm" className="w-full mt-3">
                <Link href="/admin/jobs">View Applications</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-gro-darkblue">
                <FileText className="h-5 w-5 mr-2" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gro-green mb-2">{stats.thisMonthApplications}</div>
              <p className="text-sm text-gray-600">New applications</p>
              <Button variant="secondary" size="sm" className="w-full mt-3">
                View Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-gro-darkblue">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">Account & preferences</p>
              <Button variant="secondary" size="sm" className="w-full">
                Manage Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <Card>
            <CardHeader>
              <CardTitle className="text-gro-darkblue">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-gro-teal pl-4">
                  <h4 className="font-medium text-gray-900">Welcome to GRO Recruitment!</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your recruiter dashboard is ready. Start managing applications and job postings.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Just now</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-gro-darkblue">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="gro" className="w-full">
                <Link href="/jobs">View All Job Postings</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/about">About GRO Early Learning</Link>
              </Button>
              <Button variant="secondary" className="w-full">
                Download Recruitment Guide
              </Button>
            </CardContent>
          </Card>
        </div>

        {user && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-gro-darkblue">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Name:</strong> {user?.profile?.firstName || 'Not provided'} {user?.profile?.lastName || ''}</p>
                    <p><strong>Email:</strong> {user?.email || 'Not provided'}</p>
                    <p><strong>Role:</strong> {user?.role || 'Not specified'}</p>
                  </div>
                  <div>
                    <p><strong>Job Title:</strong> {user?.profile?.jobTitle || 'Not specified'}</p>
                    <p><strong>Phone:</strong> {user?.profile?.phone || 'Not provided'}</p>
                    <p><strong>Department:</strong> Human Resources</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>

    <Footer />
  </div>
);
} 