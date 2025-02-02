import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const createEmojiIcon = (emoji) => {
    return L.divIcon({
        className: "custom-emoji-marker",
        html: `<div style="font-size: 24px; text-align: center; width: 30px; height: 30px;">${emoji}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    });
};

const PredictedFireMap = ({ deployments }) => {

    useEffect(() => {

    }, [deployments]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-500">Predicting Future Fire Locations</h2>
            {deployments.length === 0 ? (
                <p className="text-gray-500">No prediction data available.</p>
            ) : (
                <MapContainer center={[44.0927, -73.8376]} zoom={6} style={{ height: "500px", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {deployments.map((deployment, index) => {
                        const [lat, lng] = deployment.location.split(",").map(Number);
                        const markerIcon = createEmojiIcon("🔥");

                        return (
                            <Marker key={index} position={[lat, lng]} icon={markerIcon}>
                                <Popup>
                                    <strong>Fire Date:</strong> {deployment.date} <br />
                                    <strong>Location:</strong> {deployment.location} <br />
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            )}
        </div>
    );
};

export default PredictedFireMap;