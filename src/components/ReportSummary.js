import React from "react";

const ReportSummary = ({ report }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {Object.entries({
                    "Fires Addressed": report["Number of fires addressed"],
                    "Fires Delayed": report["Number of fires delayed"],
                    "Total Operational Costs": report["Total operational costs"],
                    "Delayed Responses Costs": report["Estimated damage costs from delayed responses"],
                }).map(([label, value]) => (
                    <div key={label} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-600">{label}</h3>
                        <div className="text-2xl font-bold text-black">{value}</div>
                    </div>
                ))}
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
        </>
    );
};

export default ReportSummary;
