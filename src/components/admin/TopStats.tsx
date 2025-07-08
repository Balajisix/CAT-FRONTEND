import React from "react";

interface StatsProps {
  inbound: number;
  outbound: number;
  unauthorized: number;
}

const TopStats: React.FC<StatsProps> = ({ inbound, outbound, unauthorized }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: "Inbound Vehicles", value: inbound, color: "bg-green-100 text-green-800" },
        { label: "Outbound Vehicles", value: outbound, color: "bg-blue-100 text-blue-800" },
        { label: "Unauthorized Vehicles", value: unauthorized, color: "bg-red-100 text-red-800" },
      ].map((item, idx) => (
        <div
          key={idx}
          className={`p-4 rounded shadow ${item.color} text-center font-semibold`}
        >
          <div className="text-xl">{item.value}</div>
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TopStats;
