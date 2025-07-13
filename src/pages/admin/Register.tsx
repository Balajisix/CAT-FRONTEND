import React from "react";
import Navbar from "../../components/admin/Navbar";
import Footer from "../../components/user/Footer";
import VehicleRegistration from "../../components/admin/VehicleRegistration";

const RegisterVehicle: React.FC = () => {
  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 px-4 sm:px-8">
        <VehicleRegistration />
      </main>
      <Footer />
    </div>
  );
};

export default RegisterVehicle;
