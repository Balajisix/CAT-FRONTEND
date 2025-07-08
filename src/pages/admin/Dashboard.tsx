import React, { useEffect, useState } from "react";
import { getStats } from "../../api/util";
import TopStats from "../../components/admin/TopStats";
import VehicleChart from "../../components/admin/VehicleChart";
import RecentVehiclesTable from "../../components/admin/RecentVehiclesTable";
import Navbar from "../../components/admin/Navbar";
import Footer from "../../components/user/Footer";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ inbound: 0, outbound: 0, unauthorized: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getStats();
      setStats(res.data); // expects { inbound, outbound, unauthorized }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 px-4 sm:px-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Dashboard</h2>
        <TopStats {...stats} />
        <VehicleChart />
        <RecentVehiclesTable />
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
