import React, { useState } from "react";
import { imageUpload } from "../../api/util";
import type { VehicleData } from "../../types/vehicle";
import VehicleForm from "./VehicleForm";

const ImageUplaod: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      setSelectedImage(e.target.files[0]);
    }
  } 

  const handleUpload = async () => {
    if(!selectedImage) return;
    
    const formData = new FormData();
    formData.append('image', selectedImage);

    setLoading(true);
    try {
      const result = await imageUpload(formData);
      setVehicleData(result.data);
    } catch(err) {
      console.error("Upload failed: ", err);
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload Vehilce Image</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload"}
      </button>
      
      {vehicleData && <VehicleForm data={vehicleData} />}
    </div>
  );
}

export default ImageUplaod;