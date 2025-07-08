import React from "react";
import Navbar from "../../components/admin/Navbar";
import Footer from "../../components/user/Footer";
import ImageUpload from "../../components/admin/ImageUpload";

const RegisterVehicle: React.FC = () => {
  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 px-4 sm:px-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register Vehicle</h2>
        <ImageUpload />
      </main>
      <Footer />
    </div>
  );
};

export default RegisterVehicle;
