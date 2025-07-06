import React, { useState } from "react";
import type { VehicleData } from "../../types/vehicle";
import { submitData } from "../../api/util";

interface Props {
  data: VehicleData;
  onDataUpdate?: (updatedData: VehicleData) => void;
}

const VehicleForm: React.FC<Props> = ({ data, onDataUpdate }) => {
  const [driverName, setDriverName] = useState<string>('');
  const [assetId, setAssetId] = useState<string>(data.assetId || '');
  const [assetName, setAssetName] = useState<string>(data.assetName || '');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!driverName.trim()) {
      alert('Please enter a driver name');
      return;
    }

    if (!assetId.trim() || !assetName.trim()) {
      alert('Please fill in both Asset ID and Asset Name');
      return;
    }

    setSubmitting(true);
    try {
      await submitData({
        asset_id: assetId,
        asset_name: assetName,
        driver_name: driverName,
        image_path: data.imagePath,
      });
      setSuccess(true);
      setDriverName(''); 
    } catch(err) {
      console.error('Submission failed: ', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const handleAssetIdChange = (value: string) => {
    setAssetId(value);
    if (onDataUpdate) {
      onDataUpdate({ ...data, assetId: value });
    }
  }

  const handleAssetNameChange = (value: string) => {
    setAssetName(value);
    if (onDataUpdate) {
      onDataUpdate({ ...data, assetName: value });
    }
  }

  return(
    <div className="mt-6 p-4 border rounded shadow bg-white">
      <h2 className="text-lg font-semibold mb-4">Vehicle Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Asset ID (Auto-generated):
          </label>
          <input 
            type="text"
            value={assetId}
            onChange={(e) => handleAssetIdChange(e.target.value)}
            className="border rounded px-3 py-2 w-full bg-yellow-50"
            placeholder="Auto-generated Asset ID"
          />
          <p className="text-xs text-gray-500 mt-1">You can edit this if needed</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Asset Name (Detected):
          </label>
          <input 
            type="text"
            value={assetName}
            onChange={(e) => handleAssetNameChange(e.target.value)}
            className="border rounded px-3 py-2 w-full bg-yellow-50"
            placeholder="Detected vehicle type"
          />
          <p className="text-xs text-gray-500 mt-1">You can edit this if needed</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Uploaded Image:
        </label>
        <img 
          src={data.imageUrl} 
          alt="Vehicle" 
          className="w-64 h-48 object-cover border rounded shadow"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Driver Name: *
        </label>
        <input 
          type="text"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          placeholder="Enter driver name" 
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={submitting || !driverName.trim() || !assetId.trim() || !assetName.trim()}
      >
        {submitting ? "Submitting..." : "Submit Vehicle Entry"}
      </button>

      {success && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Vehicle entry submitted successfully!
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-800">
          <strong>Auto-fill Info:</strong> Asset ID and Asset Name were automatically generated from the uploaded image. 
          You can edit these fields if needed before submitting.
        </p>
      </div>
    </div>
  );
}

export default VehicleForm;