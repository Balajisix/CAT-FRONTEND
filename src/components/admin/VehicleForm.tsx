import React, { useState } from "react";
import type { VehicleData } from "../../types/vehicle";
import { submitData } from "../../api/util";

interface Props {
  data: VehicleData;
}

const VehicleForm: React.FC<Props> = ({ data }) => {
  const [driverName, setDriverName] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitData({
        ...data,
        driverName,
      });
      setSuccess(true);
    } catch(err) {
      console.error('Submission failed: ', err);
    } finally {
      setSubmitting(false);
    }
  }

  return(
    <div className="mt-6 p-4 border rounded shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">Vehicle Details</h2>
      <p><strong>Asset ID:</strong> {data.assetId}</p>
      <p><strong>Asset Name:</strong> {data.assetName}</p>
      <p><strong>Image: </strong></p>
      <img src={data.imageUrl} alt="Vehicle" className="w-48 my-2" />
      <label className="block mt-4">
        Driver Name:
        <input 
          type="text"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          className="border rounded px-3 py-2 mt-1 w-full"
          placeholder="Enter driver name" 
          required
        />
      </label>
      <button
       onClick={handleSubmit}
       className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
       disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
      {success && <p className="text-green-500 mt-2">Submitted Successfully</p>}
    </div>
  );
}

export default VehicleForm