import React, { useEffect, useState } from "react";
import { getRecentVehicles } from "../../api/util";

const RecentVehiclesTable: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecent = async () => {
      const res = await getRecentVehicles();
      setVehicles(res.data); // expects array of { assetId, driverName, status, time }
    };
    fetchRecent();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-3">Recently Passed Vehicles</h2>
      <div className="overflow-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-yellow-100 text-gray-800">
              <th className="py-2 px-4 text-left">Asset ID</th>
              <th className="py-2 px-4 text-left">Driver</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, idx) => (
              <tr key={idx} className="border-t text-sm">
                <td className="py-2 px-4">{v.assetId}</td>
                <td className="py-2 px-4">{v.driverName}</td>
                <td className="py-2 px-4">{v.status}</td>
                <td className="py-2 px-4">{new Date(v.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentVehiclesTable;
