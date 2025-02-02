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

  const handleAddAnotherFile = () => {
    setReport(null); // Reset the report state
    setFile(null); // Reset the file state
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Wildfire Response App</h1>
          <div className="text-sm text-gray-500">Last updated: Just now</div>
        </div>

        {/* File Upload Section (Hidden if report exists) */}
        {!report && (
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
        )}

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
                              (count / report["Number of fires addressed"]) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Add Another File Button */}
            <div className="mt-8 text-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleAddAnotherFile}
              >
                Add Another File
              </button>
            </div>
          </>
        )}

        {/* Show this message if no report is available */}
        {!report && (
          <p className="text-gray-500">
            No report data available. Upload a file first.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
