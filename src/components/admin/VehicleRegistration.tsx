import React, { useState } from "react";
import { registerVehiclePreview, registerVehicle } from "../../api/util";
import type { VehicleRegistrationData } from "../../types/vehicle";

const VehicleRegistration: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<VehicleRegistrationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setPreviewData(null);
      setSuccess(false);
      setError(null);
    }
  };

  const handlePreview = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    setLoading(true);
    setError(null);

    try {
      const response = await registerVehiclePreview(formData);
      const data = response.data;
      
      setPreviewData({
        license_plate: data.license_plate || '',
        vehicle_type: data.vehicle_type || 'Unknown',
        confidence: data.confidence,
        detected_class_id: data.detected_class_id,
        image_path: data.image_path,
        color: 'Auto-detected',
        owner_name: 'Auto-registered'
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to detect vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!previewData) return;

    setLoading(true);
    setError(null);

    try {
      await registerVehicle(previewData);
      setSuccess(true);
      setPreviewData(null);
      setSelectedImage(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to register vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleEditField = (field: keyof VehicleRegistrationData, value: string) => {
    if (previewData) {
      setPreviewData({ ...previewData, [field]: value });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Vehicle Registration Module
      </h1>
      
      <div className="mb-6">
        <p className="text-gray-600 text-center mb-4">
          Upload a vehicle image to automatically detect vehicle type and license plate
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-400 rounded px-4 py-2 cursor-pointer text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-blue-200 file:text-gray-800 hover:file:bg-blue-300"
          />
          <button
            onClick={handlePreview}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !selectedImage}
          >
            {loading ? "Detecting..." : "Detect Vehicle"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          ✅ Vehicle registered successfully and added to authorized vehicles!
        </div>
      )}

      {previewData && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Detected Vehicle Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Plate *
              </label>
              <input
                type="text"
                value={previewData.license_plate}
                onChange={(e) => handleEditField('license_plate', e.target.value)}
                className="border rounded px-3 py-2 w-full bg-white"
                placeholder="License plate number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type *
              </label>
              <input
                type="text"
                value={previewData.vehicle_type}
                onChange={(e) => handleEditField('vehicle_type', e.target.value)}
                className="border rounded px-3 py-2 w-full bg-white"
                placeholder="Vehicle type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <input
                type="text"
                value={previewData.color || ''}
                onChange={(e) => handleEditField('color', e.target.value)}
                className="border rounded px-3 py-2 w-full bg-white"
                placeholder="Vehicle color"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner Name
              </label>
              <input
                type="text"
                value={previewData.owner_name || ''}
                onChange={(e) => handleEditField('owner_name', e.target.value)}
                className="border rounded px-3 py-2 w-full bg-white"
                placeholder="Owner name"
              />
            </div>
          </div>

          {previewData.confidence && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>Detection Confidence:</strong> {(previewData.confidence * 100).toFixed(1)}%
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleRegister}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              disabled={loading || !previewData.license_plate || !previewData.vehicle_type}
            >
              {loading ? "Registering..." : "Register Vehicle as Authorized"}
            </button>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This vehicle will be automatically registered as authorized and added to the authorized vehicles database.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleRegistration; 