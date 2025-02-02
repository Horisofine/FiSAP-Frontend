"use client";

import React, { useState, useEffect } from "react";
import { Tabs } from "@chakra-ui/react";
import { LuChartSpline, LuCircuitBoard } from "react-icons/lu";
import FileUploadSection from "../../components/FileUpload";
import ReportSummary from "../../components/ReportSummary";
import FireMap from "../../components/FireMap";
import PredictedFireMap from "../../components/PredictedFireMap";


const Dashboard = () => {
  const [incidentFile, setIncidentFile] = useState(null);
  const [predictionFile, setPredictionFile] = useState(null);
  const [report, setReport] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDeployments();
  }, []);

  const fetchDeployments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/deployments");
      if (!response.ok) throw new Error("Failed to fetch deployments");
      const data = await response.json();
      setDeployments(data.data);
    } catch (error) {
      console.error("Error fetching deployments:", error);
    }
  };

  const handleReset = () => {
    setReport(null);
    setIncidentFile(null);
    setPredictionFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-700">Wildfire Response App</h1>
          <div className="text-sm text-gray-500">Last updated: Just now</div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8">
          <Tabs.Root variant="outline" fitted defaultValue={"Resource Allocation"}>
            <Tabs.List bg="bg.muted" rounded="l3" p="1">
              <Tabs.Trigger value="Resource Allocation"><LuChartSpline /> Current Incidents </Tabs.Trigger>
              <Tabs.Trigger value="Prediction"><LuCircuitBoard />Predict</Tabs.Trigger>
              <Tabs.Indicator rounded="l2" />
            </Tabs.List>
            <Tabs.Content value="Resource Allocation">
              <FileUploadSection
                file={incidentFile}
                setFile={setIncidentFile}
                setReport={setReport}
                loading={loading}
                setLoading={setLoading}
                endpoint="upload"
              />
              {report && deployments && (
                <div className="space-y-8">
                  <ReportSummary report={report} />
                  <FireMap deployments={deployments} />

                </div>
              )}
            </Tabs.Content>
            <Tabs.Content value="Prediction">
              <FileUploadSection
                file={predictionFile}
                setFile={setPredictionFile}
                setReport={setPredictions}
                loading={loading}
                setLoading={setLoading}
                endpoint="predictions"
              />
              {
                predictions && (
                  <div className="space-y-8">
                    <PredictedFireMap deployments={predictions} />
                  </div>
                )
              }
            </Tabs.Content>
          </Tabs.Root>
        </div>


      </div>
    </div >
  );
};
export default Dashboard;
