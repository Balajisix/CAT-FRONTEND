import React, { useEffect, useState } from "react";
import { getAuthorizedVehicles } from "../../api/util";
import type { AuthorizedVehicle } from "../../types/vehicle";
import Navbar from "../../components/admin/Navbar";
import Footer from "../../components/user/Footer";

const AuthorizedVehiclesPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<AuthorizedVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getAuthorizedVehicles();
        setVehicles(response.data.vehicles);
      } catch {
        setError("Failed to fetch vehicles.");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Authorized Vehicles</h2>

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-x-auto border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">License Plate</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Vehicle Type</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Added On</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-800">{v.license_plate}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{v.vehicle_type}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{v.owner_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(v.added_on).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {vehicles.length === 0 && (
              <div className="p-6 text-center text-gray-500">No vehicles found.</div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AuthorizedVehiclesPage;
