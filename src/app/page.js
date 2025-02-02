// "use client";

// import { useEffect } from "react";

// const Dashboard = () => {
//   useEffect(() => {
//     // If needed, you can add any additional logic here
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
//         <p>Your file has been uploaded successfully.</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// "use client";

// import Link from "next/link";

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
//         <p>Your file has been uploaded successfully.</p>

//         {/* Link to the Upload page */}
//         <div className="mt-8">
//           <Link href="/upload" className="text-blue-500 underline">
//             Click here to upload another file
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";

const Dashboard = () => {
  // Mock data for the dashboard
  const mockChartData = [
    { date: "Jun 1", fires: 12 },
    { date: "Jun 2", fires: 19 },
    { date: "Jun 3", fires: 15 },
    { date: "Jun 4", fires: 25 },
    { date: "Jun 5", fires: 32 },
    { date: "Jun 6", fires: 28 },
    { date: "Jun 7", fires: 20 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Wildfire Response Dashboard</h1>
          <div className="text-sm text-gray-500">Last updated: Just now</div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">
              Fires Addressed
            </h3>
            <div className="text-2xl font-bold">127</div>
            <p className="mt-2 text-xs text-gray-600">
              Total fires successfully responded to
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Total Cost</h3>
            <div className="text-2xl font-bold">$1,458,000</div>
            <p className="mt-2 text-xs text-gray-600">
              Combined operational and damage costs
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Active Fires</h3>
            <div className="text-2xl font-bold">8</div>
            <p className="mt-2 text-xs text-gray-600">
              Currently burning fires
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">
              Available Units
            </h3>
            <div className="text-2xl font-bold">23/28</div>
            <p className="mt-2 text-xs text-gray-600">
              Total units ready for deployment
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4">Fire Activity Trend</h2>
          <div className="h-64">
            {/* Custom Chart Implementation */}
            <div className="relative w-full h-full">
              {/* X-Axis */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
                {mockChartData.map((data) => (
                  <span key={data.date}>{data.date}</span>
                ))}
              </div>

              {/* Y-Axis */}
              <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-xs text-gray-600">
                {[0, 10, 20, 30, 40].map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>

              {/* Line Chart */}
              <div className="absolute top-0 left-0 right-0 bottom-0">
                {mockChartData.map((data, index) => (
                  <div
                    key={data.date}
                    className="absolute bottom-0"
                    style={{
                      left: `${(index / (mockChartData.length - 1)) * 100}%`,
                      height: `${(data.fires / 40) * 100}%`,
                      width: "2px",
                      backgroundColor: "#ef4444",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resource Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Resource Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Smoke Jumpers</span>
                <span className="font-medium text-green-600">
                  4/5 Available
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Fire Engines</span>
                <span className="font-medium text-green-600">
                  8/10 Available
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Helicopters</span>
                <span className="font-medium text-yellow-600">
                  1/3 Available
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tanker Planes</span>
                <span className="font-medium text-red-600">0/2 Available</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Ground Crews</span>
                <span className="font-medium text-green-600">
                  6/8 Available
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">
              Fire Severity Distribution
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>High Severity</span>
                  <span className="text-red-600 font-medium">12 fires</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "40%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Medium Severity</span>
                  <span className="text-yellow-600 font-medium">28 fires</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Low Severity</span>
                  <span className="text-green-600 font-medium">87 fires</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
