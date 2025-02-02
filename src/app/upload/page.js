"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fetchReport = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setReport(data.report);

      fetchDeployments();

    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeployments = async () => {
    try {
      console.log("Fetching deployments");
      const response = await fetch("http://127.0.0.1:5000/deployments");
      if (!response.ok) throw new Error("Failed to fetch deployments");
      const data = await response.json();
      console.log("Deployments:", data);
      setDeployments(data.deployments);
    } catch (error) {
      console.error("Error fetching deployments:", error);
    }
  };

  const handleAddAnotherFile = () => {
    setReport(null);
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-500">Wildfire Response App</h1>
          <div className="text-sm text-gray-500">Last updated: Just now</div>
        </div>

        {!report && (
          <div className="mb-8 flex items-center space-x-4">
            <input type="file" accept=".csv" onChange={handleFileChange} className="border border-gray-300 rounded p-2" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={fetchReport} disabled={loading}>
              {loading ? "Uploading..." : "Upload Wildfire Data"}
            </button>
          </div>
        )}

        {report && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">Fires Addressed</h3>
                <div className="text-2xl font-bold text-black">{report["Number of fires addressed"]}</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">Fires Delayed</h3>
                <div className="text-2xl font-bold text-black">{report["Number of fires delayed"]}</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">Total Operational Costs</h3>
                <div className="text-2xl font-bold text-black">{report["Total operational costs"]}</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">Delayed Responses Costs</h3>
                <div className="text-2xl font-bold text-black">{report["Estimated damage costs from delayed responses"]}</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-500">Fire Severity Distribution</h2>
              <div className="space-y-4">
                {Object.entries(report["Fire severity report"]).map(([severity, count]) => (
                  <div key={severity}>
                    <div className="flex justify-between mb-1 text-black">
                      <span>{severity} Severity</span>
                      <span className="font-medium">{count} fires</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: `${(count / report["Number of fires addressed"]) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {deployments && deployments.length === 0 ? (
              <p className="text-gray-500">No deployment data available.</p>
            ) : (
              deployments && (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-500">Fire Deployment Locations</h2>
                  <MapContainer center={[44.0927, -73.8376]} zoom={6} style={{ height: "500px", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {deployments.map((deployment, index) => {
                      const [lat, lng] = deployment.location.split(",").map(Number);
                      return (
                        <Marker key={index} position={[lat, lng]} icon={customIcon}>
                          <Popup>
                            <strong>Fire Start Time:</strong> {deployment.fire_start_time} <br />
                            <strong>Severity:</strong> {deployment.severity} <br />
                            <strong>Deployed:</strong> {deployment.is_deployed ? "Yes" : "No"} <br />
                            <strong>Resources Used:</strong> {deployment.resource_used}
                          </Popup>
                        </Marker>
                      );
                    })}
                  </MapContainer>
                </div>
              )
            )}

            <div className="mt-8 text-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleAddAnotherFile}>
                Add Another File
              </button>
            </div>
          </>
        )}




        {!report && <p className="text-gray-500">No report data available. Upload a file first.</p>}
      </div>
    </div>
  );
};

export default Dashboard;
