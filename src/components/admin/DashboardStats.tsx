import React, { useState, useEffect } from "react";
import { getVehicleStatistics, getRecentMovements } from "../../api/util";
import type { VehicleStatistics, VehicleMovement } from "../../types/vehicle";
import MovementChart from "./MovementChart";
import RecentMovements from "./RecentMovements";

const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState<VehicleStatistics | null>(null);
  const [recentMovements, setRecentMovements] = useState<VehicleMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [statsResponse, movementsResponse] = await Promise.all([
        getVehicleStatistics(),
        getRecentMovements()
      ]);
      
      setStats(statsResponse.data.stats);
      setRecentMovements(movementsResponse.data.movements);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-red-800 font-semibold mb-2">Error Loading Dashboard</div>
        <div className="text-red-600">{error}</div>
        <button 
          onClick={fetchDashboardData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="text-yellow-800">No dashboard data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Authorized Vehicles</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total_authorized_vehicles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Inbound</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.inbound_count}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Outbound</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.outbound_count}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recent Entries (24h)</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.recent_entries_24h}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Movement Chart and Recent Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MovementChart />
        <RecentMovements movements={recentMovements} />
      </div>

      {/* Vehicle Types Distribution Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Vehicle Types Distribution</h3>
        <div className="space-y-3">
          {Object.entries(stats.vehicle_types_distribution).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{type}</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ 
                      width: `${(count / stats.total_authorized_vehicles) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats; 