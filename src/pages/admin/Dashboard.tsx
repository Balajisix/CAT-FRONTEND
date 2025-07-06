import React from "react";
import ImageUpload from "../../components/admin/ImageUpload";
import Navbar from "../../components/admin/Navbar";
import Footer from "../../components/user/Footer";

const AdminPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 px-4 sm:px-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Dashboard</h2>
        <ImageUpload />
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
