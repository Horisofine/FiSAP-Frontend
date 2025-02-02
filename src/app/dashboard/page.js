"use client";

import React, { useState } from "react";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store selected file
  };

  const fetchReport = async () => {
    if (!file) {
      console.error("No file selected!");
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Ensure the key matches what backend expects

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData, // Send file in request body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Report data:", data.report);
      setReport(data.report);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Wildfire Response Dashboard</h1>
          <div className="text-sm text-gray-500">Last updated: Just now</div>
        </div>

        {/* File Upload Section */}
        <div className="mb-8 flex items-center space-x-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={fetchReport}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Wildfire Data"}
          </button>
        </div>

        {/* Metrics Grid (only shown if report data exists) */}
        {report && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">
                  Fires Addressed
                </h3>
                <div className="text-2xl font-bold">
                  {report["Number of fires addressed"]}
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  Total fires successfully responded to
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">
                  Fires Delayed
                </h3>
                <div className="text-2xl font-bold">
                  {report["Number of fires delayed"]}
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  Total fires delayed in response
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Operational Costs
                </h3>
                <div className="text-2xl font-bold">
                  {report["Total operational costs"]}
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  Combined operational costs
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">
                  Estimated Damage Costs from Delayed Responses
                </h3>
                <div className="text-2xl font-bold">
                  {report["Estimated damage costs from delayed responses"]}
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  Estimated costs due to delayed responses
                </p>
              </div>
            </div>

            {/* Fire Severity Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">
                Fire Severity Distribution
              </h2>
              <div className="space-y-4">
                {Object.entries(report["Fire severity report"]).map(
                  ([severity, count]) => (
                    <div key={severity}>
                      <div className="flex justify-between mb-1">
                        <span>{severity} Severity</span>
                        <span className="font-medium">{count} fires</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (count / report["Number of fires addressed"]) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}

        {/* Show this message if no report is available */}
        {!report && <p className="text-gray-500">No report data available. Upload a file first.</p>}
      </div>
    </div>
  );
};

export default Dashboard;




// "use client";
//
// import React, { useState } from "react";
//
// const Dashboard = () => {
//   const [file, setFile] = useState(null);
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(false);
//
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]); // Store selected file
//   };
//
//   const fetchReport = async () => {
//     if (!file) {
//       console.error("No file selected!");
//       alert("Please select a file first!");
//       return;
//     }
//
//     const formData = new FormData();
//     formData.append("file", file); // Ensure the key matches what backend expects
//
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:5000/upload", {
//         method: "POST",
//         body: formData, // Send file in request body
//       });
//
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//
//       const data = await response.json();
//       console.log("Report data:", data.report);
//       setReport(data.report);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* File Upload Section */}
//         <div className="mb-4">
//           <input type="file" accept=".csv" onChange={handleFileChange} />
//           <button
//             className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={fetchReport}
//             disabled={loading}
//           >
//             {loading ? "Uploading..." : "Upload Wildfire Data"}
//           </button>
//         </div>
//
//         {/* Display Report if Available */}
//         {report ? (
//           <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//             <h2 className="text-xl font-semibold mb-4">Report Summary</h2>
//             <p>Fires Addressed: {report["Number of fires addressed"]}</p>
//             <p>Fires Delayed: {report["Number of fires delayed"]}</p>
//             <p>Operational Costs: {report["Total operational costs"]}</p>
//             <p>Estimated Damage Costs: {report["Estimated damage costs from delayed responses"]}</p>
//             <h3 className="mt-4">Fire Severity Breakdown</h3>
//             {Object.entries(report["Fire severity report"]).map(([severity, count]) => (
//               <p key={severity}>
//                 {severity}: {count} fires
//               </p>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No report data available. Upload a file first.</p>
//         )}
//       </div>
//     </div>
//   );
// };
//
// export default Dashboard;
//
// ///////
// // const Dashboard = () => {
// //   // Mock data for the dashboard
// //   const mockChartData = [
// //     { date: "Jun 1", fires: 12 },
// //     { date: "Jun 2", fires: 19 },
// //     { date: "Jun 3", fires: 15 },
// //     { date: "Jun 4", fires: 25 },
// //     { date: "Jun 5", fires: 32 },
// //     { date: "Jun 6", fires: 28 },
// //     { date: "Jun 7", fires: 20 },
// //   ];
//
// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-8">
// //           <h1 className="text-3xl font-bold">Wildfire Response Dashboard</h1>
// //           <div className="text-sm text-gray-500">Last updated: Just now</div>
// //         </div>
//
// //         {/* Metrics Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //           <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
// //             <h3 className="text-sm font-medium text-gray-600">
// //               Fires Addressed
// //             </h3>
// //             <div className="text-2xl font-bold">28</div>
// //             <p className="mt-2 text-xs text-gray-600">
// //               Total fires successfully responded to
// //             </p>
// //           </div>
// //           <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
// //             <h3 className="text-sm font-medium text-gray-600">Fires Delayed</h3>
// //             <div className="text-2xl font-bold">4</div>
// //             <p className="mt-2 text-xs text-gray-600">
// //               Total fires delayed in response
// //             </p>
// //           </div>
// //           <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
// //             <h3 className="text-sm font-medium text-gray-600">
// //               Total Operational Costs
// //             </h3>
// //             <div className="text-2xl font-bold">$123,000</div>
// //             <p className="mt-2 text-xs text-gray-600">
// //               Combined operational costs
// //             </p>
// //           </div>
// //           <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
// //             <h3 className="text-sm font-medium text-gray-600">
// //               Estimated Damage Costs from Delayed Responses
// //             </h3>
// //             <div className="text-2xl font-bold">$550,000</div>
// //             <p className="mt-2 text-xs text-gray-600">
// //               Estimated costs due to delayed responses
// //             </p>
// //           </div>
// //         </div>
//
// //         {/* Chart */}
// //         <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8">
// //           <h2 className="text-xl font-semibold mb-4">Fire Activity Trend</h2>
// //           <div className="h-64">
// //             {/* Custom Chart Implementation */}
// //             <div className="relative w-full h-full">
// //               {/* X-Axis */}
// //               <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
// //                 {mockChartData.map((data) => (
// //                   <span key={data.date}>{data.date}</span>
// //                 ))}
// //               </div>
//
// //               {/* Y-Axis */}
// //               <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-xs text-gray-600">
// //                 {[0, 10, 20, 30, 40].map((value) => (
// //                   <span key={value}>{value}</span>
// //                 ))}
// //               </div>
//
// //               {/* Line Chart */}
// //               <div className="absolute top-0 left-0 right-0 bottom-0">
// //                 {mockChartData.map((data, index) => (
// //                   <div
// //                     key={data.date}
// //                     className="absolute bottom-0"
// //                     style={{
// //                       left: `${(index / (mockChartData.length - 1)) * 100}%`,
// //                       height: `${(data.fires / 40) * 100}%`,
// //                       width: "2px",
// //                       backgroundColor: "#ef4444",
// //                     }}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
//
// //         {/* Resource Status */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
// //             <h2 className="text-xl font-semibold mb-4">Resource Status</h2>
// //             <div className="space-y-4">
// //               <div className="flex justify-between items-center">
// //                 <span>Smoke Jumpers</span>
// //                 <span className="font-medium text-green-600">
// //                   4/5 Available
// //                 </span>
// //               </div>
// //               <div className="flex justify-between items-center">
// //                 <span>Fire Engines</span>
// //                 <span className="font-medium text-green-600">
// //                   8/10 Available
// //                 </span>
// //               </div>
// //               <div className="flex justify-between items-center">
// //                 <span>Helicopters</span>
// //                 <span className="font-medium text-yellow-600">
// //                   1/3 Available
// //                 </span>
// //               </div>
// //               <div className="flex justify-between items-center">
// //                 <span>Tanker Planes</span>
// //                 <span className="font-medium text-red-600">0/2 Available</span>
// //               </div>
// //               <div className="flex justify-between items-center">
// //                 <span>Ground Crews</span>
// //                 <span className="font-medium text-green-600">
// //                   6/8 Available
// //                 </span>
// //               </div>
// //             </div>
// //           </div>
//
// //           <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
// //             <h2 className="text-xl font-semibold mb-4">
// //               Fire Severity Distribution
// //             </h2>
// //             <div className="space-y-4">
// //               <div>
// //                 <div className="flex justify-between mb-1">
// //                   <span>High Severity</span>
// //                   <span className="text-red-600 font-medium">12 fires</span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 rounded-full h-2">
// //                   <div
// //                     className="bg-red-600 h-2 rounded-full"
// //                     style={{ width: "40%" }}
// //                   />
// //                 </div>
// //               </div>
// //               <div>
// //                 <div className="flex justify-between mb-1">
// //                   <span>Medium Severity</span>
// //                   <span className="text-yellow-600 font-medium">28 fires</span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 rounded-full h-2">
// //                   <div
// //                     className="bg-yellow-500 h-2 rounded-full"
// //                     style={{ width: "65%" }}
// //                   />
// //                 </div>
// //               </div>
// //               <div>
// //                 <div className="flex justify-between mb-1">
// //                   <span>Low Severity</span>
// //                   <span className="text-green-600 font-medium">87 fires</span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 rounded-full h-2">
// //                   <div
// //                     className="bg-green-500 h-2 rounded-full"
// //                     style={{ width: "85%" }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
//
// // export default Dashboard;
