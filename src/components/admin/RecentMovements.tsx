import React from "react";
import type { VehicleMovement } from "../../types/vehicle";

interface Props {
  movements: VehicleMovement[];
}

const RecentMovements: React.FC<Props> = ({ movements }) => {
  if (!movements || movements.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Vehicle Movements</h3>
        <div className="text-center py-8 text-gray-500">
          No recent vehicle movements found
        </div>
      </div>
    );
  }

  const getDirectionIcon = (direction: string) => {
    return direction === 'inbound' ? (
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    );
  };

  const getStatusBadge = (isAuthorized: boolean) => {
    return isAuthorized ? (
      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
        Authorized
      </span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
        Unauthorized
      </span>
    );
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Vehicle Movements</h3>
      
      <div className="space-y-3">
        {movements.map((movement) => (
          <div key={movement.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center space-x-4">
              {/* Direction Icon */}
              <div className="flex-shrink-0">
                {getDirectionIcon(movement.direction)}
              </div>
              
              {/* Vehicle Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-mono text-sm font-medium text-gray-900">
                    {movement.license_plate}
                  </span>
                  {getStatusBadge(movement.is_authorized)}
                </div>
                <div className="text-sm text-gray-600">
                  {movement.vehicle_type} • {movement.driver_name}
                </div>
              </div>
            </div>
            
            {/* Time */}
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900 capitalize">
                {movement.direction}
              </div>
              <div className="text-xs text-gray-500">
                {formatTime(movement.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Inbound</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span>Outbound</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentMovements; 