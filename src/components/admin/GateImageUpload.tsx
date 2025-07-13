import React, { useState } from "react";
import { checkVehicle } from "../../api/util";
import type { VehicleCheckResult } from "../../types/vehicle";

const GateImageUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [direction, setDirection] = useState<string>("inbound");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VehicleCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleCheck = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    setResult(null);
    setError(null);
    
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("direction", direction);
    
    try {
      const res = await checkVehicle(formData);
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Check failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Vehicle Check Module (Inbound/Outbound Detection)
      </h1>
      
      <div className="mb-6">
        <p className="text-gray-600 text-center mb-4">
          Upload a vehicle image to check if it's authorized for entry/exit
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-400 rounded px-4 py-2 cursor-pointer text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-blue-200 file:text-gray-800 hover:file:bg-blue-300"
          />
          <select
            value={direction}
            onChange={e => setDirection(e.target.value)}
            className="px-4 py-2 border border-gray-400 rounded bg-white"
          >
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
          <button
            onClick={handleCheck}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !selectedImage}
          >
            {loading ? "Checking..." : "Check Vehicle"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className={`p-6 rounded-lg border-2 shadow-lg ${
          result.is_authorized 
            ? "bg-green-50 border-green-400" 
            : "bg-red-50 border-red-400"
        }`}>
          <div className="text-center">
            <div className={`text-4xl mb-4 ${
              result.is_authorized ? "text-green-600" : "text-red-600"
            }`}>
              {result.is_authorized ? "✅" : "❌"}
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${
              result.is_authorized ? "text-green-800" : "text-red-800"
            }`}>
              {result.message}
            </h2>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-gray-800 mb-2">Vehicle Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">License Plate:</span>
                  <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">
                    {result.license_plate}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Vehicle Type:</span>
                  <span className="ml-2">{result.vehicle_type}</span>
                </div>
                <div>
                  <span className="font-medium">Direction:</span>
                  <span className="ml-2 capitalize">{result.direction}</span>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    result.is_authorized 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {result.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold text-gray-800 mb-2">Action Required</h3>
              <div className="text-sm text-gray-600">
                {result.is_authorized ? (
                  <div className="text-green-700">
                    <p>✅ Vehicle is authorized for {result.direction}.</p>
                    <p className="mt-2">Proceed with normal entry/exit procedures.</p>
                  </div>
                ) : (
                  <div className="text-red-700">
                    <p>❌ Vehicle is not authorized for {result.direction}.</p>
                    <p className="mt-2">Please contact security or register this vehicle first.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GateImageUpload; 