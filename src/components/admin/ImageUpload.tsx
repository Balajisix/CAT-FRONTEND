import React, { useState } from "react";
import { imageUpload } from "../../api/util";
import type { VehicleData } from "../../types/vehicle";
import VehicleForm from "./VehicleForm";

const ImageUpload: React.FC = () => {
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
      const response = await imageUpload(formData);
            const backendData = response.data;
      
      console.log("Backend response:", backendData);
            const transformedData: VehicleData = {
        assetId: backendData.asset_id,       
        assetName: backendData.asset_name,    
        imageUrl: backendData.image_url,      
        imagePath: backendData.image_path,    
      };
      
      console.log("Transformed data:", transformedData);
      
      setVehicleData(transformedData);
    } catch(err) {
      console.error("Upload failed: ", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload Vehicle Image</h1>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        className="border border-gray-400 rounded px-4 py-2 cursor-pointer text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-yellow-200 file:text-gray-800 hover:file:bg-yellow-300" 
      />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading || !selectedImage}
      >
        {loading ? "Processing..." : "Upload"}
      </button>
      
      {vehicleData && <VehicleForm data={vehicleData} />}
    </div>
  );
}

export default ImageUpload;