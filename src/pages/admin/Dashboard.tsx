import React from "react";
import DashboardStats from "../../components/admin/DashboardStats";
import Navbar from "../../components/admin/Navbar";
import Footer from "../../components/user/Footer";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 px-4 sm:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Fleet Management Dashboard
        </h2>
        
        {/* Quick Action Buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <Link 
            to="/admin/register" 
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Register Vehicle
          </Link>
          
          <Link 
            to="/admin/gate-check" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Gate Vehicle Check
          </Link>
        </div>
        
        {/* Dashboard Statistics */}
        <DashboardStats />
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
