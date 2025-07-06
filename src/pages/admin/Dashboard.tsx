import React from "react";
import ImageUpload from "../../components/ImageUpload";

const AdminPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <ImageUpload />
    </div>
  );
};

export default AdminPanel;
