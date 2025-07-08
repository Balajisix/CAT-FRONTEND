import React, { useState, useEffect } from "react";
import { getChartData } from "../../api/util";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ranges = ["daily", "weekly", "3m", "6m", "12m"];

const VehicleChart: React.FC = () => {
  const [range, setRange] = useState("daily");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchChart = async () => {
      const res = await getChartData(range);
      setData(res.data); 
    };
    fetchChart();
  }, [range]);

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Inbound/Outbound Vehicle Trends</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {ranges.map((r) => (
            <option key={r} value={r}>
              {r.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="inbound" stroke="#4ade80" />
          <Line type="monotone" dataKey="outbound" stroke="#60a5fa" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VehicleChart;
