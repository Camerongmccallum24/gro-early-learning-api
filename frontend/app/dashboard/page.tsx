import { redirect } from 'next/navigation';

export default function DashboardPage() {
  redirect('/jobs');
}
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
    }
  } catch (err) {
    console.log('Failed to load user data:', err);
  } finally {
    setLoading(false);
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
          <p className="text-gro-gray">Loading dashboard...</p>
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
                Welcome back{user ? `, ${user.profile.firstName}` : ''}!
              </h1>
              <p className="text-gro-gray mt-2">
                Your GRO Early Learning candidate portal
              </p>
            </div>
            <Button onClick={handleLogout} variant="secondary" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gro-darkblue">
                <UserIcon className="h-5 w-5 mr-2" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user && (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {user.profile.firstName} {user.profile.lastName}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                </div>
              )}
              <Button variant="secondary" size="sm" className="w-full mt-4">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gro-darkblue">
                <Briefcase className="h-5 w-5 mr-2" />
                Job Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationsList />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-gro-darkblue">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="gro" size="sm" className="w-full">
                <Link href="/jobs">Find Jobs</Link>
              </Button>
              <Button variant="secondary" size="sm" className="w-full">
                Upload Resume
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-gro-darkblue">Welcome to GRO Early Learning!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                You're now part of the GRO Early Learning community. Start exploring opportunities
                in early childhood education across Queensland's mining communities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild variant="gro">
                  <Link href="/jobs">View All Jobs</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/about">Learn About GRO</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>

    <Footer />
  </div>
);
} 