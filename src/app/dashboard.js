// /app/dashboard/page.js
"use client";

import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    // If needed, you can add any additional logic here
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p>Your file has been uploaded successfully.</p>
      </div>
    </div>
  );
};

export default Dashboard;
