// MongoDB initialization script
// This script runs when the container starts for the first time

// Switch to the ats-system database
db = db.getSiblingDB('ats-system');

// Create a user for the application
db.createUser({
  user: 'atsuser',
  pwd: 'atspassword123',
  roles: [
    {
      role: 'readWrite',
      db: 'ats-system'
    }
  ]
});

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.companies.createIndex({ name: 1 });
db.jobs.createIndex({ company: 1 });
db.jobs.createIndex({ status: 1 });
db.jobs.createIndex({ createdAt: -1 });
db.applications.createIndex({ job: 1 });
db.applications.createIndex({ candidate: 1 });
db.applications.createIndex({ status: 1 });

print('Database ats-system initialized successfully!'); 