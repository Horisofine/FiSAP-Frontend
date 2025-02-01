// "use client"; // Make this a client-side component

// import { useState } from "react";

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type === "text/csv") {
//       setFile(selectedFile);
//       setError("");
//     } else {
//       setError("Please select a valid CSV file");
//       setFile(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     setLoading(true);
//     setError("");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("http://localhost:3000/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Upload failed");
//       }

//       setSuccess(true);
//       // Redirect to dashboard after successful upload
//       setTimeout(() => {
//         window.location.href = "/dashboard";
//       }, 2000);
//     } catch (err) {
//       setError("Failed to upload file. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
//         <div className="bg-white p-8 rounded-lg shadow-md">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold mb-2">Upload Wildfire Data</h1>
//             <p className="text-gray-600">
//               Upload your CSV file containing wildfire data
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 accept=".csv"
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="cursor-pointer flex flex-col items-center gap-2"
//               >
//                 {file ? (
//                   <>
//                     {/* FileText Icon */}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="h-12 w-12 text-blue-500"
//                     >
//                       <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
//                       <polyline points="14 2 14 8 20 8" />
//                       <path d="M16 13H8" />
//                       <path d="M16 17H8" />
//                       <path d="M10 9H8" />
//                     </svg>
//                     <span className="text-sm text-gray-600">{file.name}</span>
//                   </>
//                 ) : (
//                   <>
//                     {/* Upload Icon */}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="h-12 w-12 text-gray-400"
//                     >
//                       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                       <polyline points="17 8 12 3 7 8" />
//                       <line x1="12" y1="3" x2="12" y2="15" />
//                     </svg>
//                     <span className="text-sm text-gray-600">
//                       Click to select or drag and drop your CSV file
//                     </span>
//                   </>
//                 )}
//               </label>
//             </div>

//             {error && (
//               <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 flex items-center gap-2">
//                 {/* AlertCircle Icon */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="h-4 w-4"
//                 >
//                   <circle cx="12" cy="12" r="10" />
//                   <line x1="12" y1="8" x2="12" y2="12" />
//                   <line x1="12" y1="16" x2="12.01" y2="16" />
//                 </svg>
//                 <span>{error}</span>
//               </div>
//             )}

//             {success && (
//               <div className="bg-green-50 text-green-700 border border-green-200 rounded-lg p-4 flex items-center gap-2">
//                 {/* CheckCircle Icon */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="h-4 w-4"
//                 >
//                   <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//                   <polyline points="22 4 12 14.01 9 11.01" />
//                 </svg>
//                 <span>
//                   File uploaded successfully! Redirecting to dashboard...
//                 </span>
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
//               disabled={!file || loading}
//             >
//               {loading ? (
//                 <span className="flex items-center gap-2">
//                   {/* Loading Spinner */}
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     />
//                   </svg>
//                   Uploading...
//                 </span>
//               ) : (
//                 "Upload File"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileUpload;
"use client"; // Make this a client-side component

import { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please select a valid CSV file");
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setSuccess(true);
      // Redirect to dashboard after successful upload
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      setError("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Upload Wildfire Data</h1>
            <p className="text-gray-600">
              Upload your CSV file containing wildfire data
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".csv"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {file ? (
                  <>
                    {/* FileText Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-12 w-12 text-blue-500"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                      <path d="M10 9H8" />
                    </svg>
                    <span className="text-sm text-gray-600">{file.name}</span>
                  </>
                ) : (
                  <>
                    {/* Upload Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-12 w-12 text-gray-400"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="text-sm text-gray-600">
                      Click to select or drag and drop your CSV file
                    </span>
                  </>
                )}
              </label>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 flex items-center gap-2">
                {/* AlertCircle Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-700 border border-green-200 rounded-lg p-4 flex items-center gap-2">
                {/* CheckCircle Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>
                  File uploaded successfully! Redirecting to dashboard...
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={!file || loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  {/* Loading Spinner */}
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload File"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;

//
// // "use client"; // Make this a client-side component

// // Mock data
// const mockChartData = [
//   { date: "Jun 1", fires: 12 },
//   { date: "Jun 2", fires: 19 },
//   { date: "Jun 3", fires: 15 },
//   { date: "Jun 4", fires: 25 },
//   { date: "Jun 5", fires: 32 },
//   { date: "Jun 6", fires: 28 },
//   { date: "Jun 7", fires: 20 },
// ];

// const Card = ({ title, value, description, trend }) => {
//   const getTrendColor = (trend) => {
//     if (!trend) return "text-gray-600";
//     return trend > 0 ? "text-red-500" : "text-green-500";
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200">
//       <div className="flex flex-row items-center justify-between pb-2">
//         <h3 className="text-sm font-medium text-gray-600">{title}</h3>
//       </div>
//       <div className="text-2xl font-bold">{value}</div>
//       {description && (
//         <p className="mt-2 text-xs text-gray-600">{description}</p>
//       )}
//       {trend && (
//         <div className={`mt-2 text-sm ${getTrendColor(trend)}`}>
//           {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from previous period
//         </div>
//       )}
//     </div>
//   );
// };

// const DashboardDemo = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Wildfire Response Dashboard</h1>
//           <div className="text-sm text-gray-500">Last updated: Just now</div>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <Card
//             title="Fires Addressed"
//             value="127"
//             description="Total fires successfully responded to"
//             trend={-12}
//           />
//           <Card
//             title="Total Cost"
//             value="$1,458,000"
//             description="Combined operational and damage costs"
//             trend={15}
//           />
//           <Card
//             title="Active Fires"
//             value="8"
//             description="Currently burning fires"
//           />
//           <Card
//             title="Available Units"
//             value="23/28"
//             description="Total units ready for deployment"
//           />
//         </div>

//         {/* Chart */}
//         <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8">
//           <h2 className="text-xl font-semibold mb-4">Fire Activity Trend</h2>
//           <div className="h-64">
//             {/* Custom Chart Implementation */}
//             <div className="relative w-full h-full">
//               {/* X-Axis */}
//               <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
//                 {mockChartData.map((data) => (
//                   <span key={data.date}>{data.date}</span>
//                 ))}
//               </div>

//               {/* Y-Axis */}
//               <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-xs text-gray-600">
//                 {[0, 10, 20, 30, 40].map((value) => (
//                   <span key={value}>{value}</span>
//                 ))}
//               </div>

//               {/* Line Chart */}
//               <div className="absolute top-0 left-0 right-0 bottom-0">
//                 {mockChartData.map((data, index) => (
//                   <div
//                     key={data.date}
//                     className="absolute bottom-0"
//                     style={{
//                       left: `${(index / (mockChartData.length - 1)) * 100}%`,
//                       height: `${(data.fires / 40) * 100}%`,
//                       width: "2px",
//                       backgroundColor: "#ef4444",
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Resource Status */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//             <h2 className="text-xl font-semibold mb-4">Resource Status</h2>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span>Smoke Jumpers</span>
//                 <span className="font-medium text-green-600">
//                   4/5 Available
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>Fire Engines</span>
//                 <span className="font-medium text-green-600">
//                   8/10 Available
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>Helicopters</span>
//                 <span className="font-medium text-yellow-600">
//                   1/3 Available
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>Tanker Planes</span>
//                 <span className="font-medium text-red-600">0/2 Available</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>Ground Crews</span>
//                 <span className="font-medium text-green-600">
//                   6/8 Available
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//             <h2 className="text-xl font-semibold mb-4">
//               Fire Severity Distribution
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <div className="flex justify-between mb-1">
//                   <span>High Severity</span>
//                   <span className="text-red-600 font-medium">12 fires</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-red-600 h-2 rounded-full"
//                     style={{ width: "40%" }}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between mb-1">
//                   <span>Medium Severity</span>
//                   <span className="text-yellow-600 font-medium">28 fires</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-yellow-500 h-2 rounded-full"
//                     style={{ width: "65%" }}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between mb-1">
//                   <span>Low Severity</span>
//                   <span className="text-green-600 font-medium">87 fires</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-green-500 h-2 rounded-full"
//                     style={{ width: "85%" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardDemo;
