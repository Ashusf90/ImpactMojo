import React from 'react';
// The problematic import has been removed.

// The component now receives the user information as a "prop" from App.js.
const DashboardPage = ({ user }) => {

  // If the user is not signed in, show a prompt.
  if (!user) {
    return (
       <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Please sign in to view your personalized dashboard.</p>
      </div>
    );
  }

  // If the user is signed in, welcome them.
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">Welcome, {user.displayName}!</h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300">This is your personal dashboard. More features coming soon!</p>
    </div>
  );
};

export default DashboardPage;

