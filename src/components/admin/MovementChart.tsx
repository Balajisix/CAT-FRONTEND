import React, { useState, useEffect } from "react";
import { getVehicleMovements } from "../../api/util";
import type { MovementData } from "../../types/vehicle";

interface Props {
  data?: MovementData[];
}

const MovementChart: React.FC<Props> = ({ data: initialData }) => {
  const [data, setData] = useState<MovementData[]>(initialData || []);
  const [period, setPeriod] = useState<string>('7days');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const periods = [
    { value: 'today', label: 'Today' },
    { value: '7days', label: 'Last 7 Days' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const fetchData = async (selectedPeriod: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getVehicleMovements(selectedPeriod);
      setData(response.data.movements);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load movement data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchData(period);
    }
  }, [period, initialData]);

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    if (!initialData) {
      fetchData(newPeriod);
    }
  };

  const renderLineGraph = () => {
    if (!data || data.length === 0) return null;

    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Find max values for scaling
    const maxInbound = Math.max(...data.map(d => d.inbound));
    const maxOutbound = Math.max(...data.map(d => d.outbound));
    const maxValue = Math.max(maxInbound, maxOutbound, 1); // Minimum 1 to avoid division by zero

    // Create scales
    const xScale = (index: number) => margin.left + (index / (data.length - 1)) * chartWidth;
    const yScale = (value: number) => margin.top + chartHeight - (value / maxValue) * chartHeight;

    // Create path data for lines
    const createPath = (dataPoints: number[], color: string) => {
      if (dataPoints.length === 0) return null;

      const points = dataPoints.map((value, index) => {
        const x = xScale(index);
        const y = yScale(value);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');

      return (
        <path
          d={points}
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    };

    // Create area fill for inbound
    const createArea = (dataPoints: number[], color: string) => {
      if (dataPoints.length === 0) return null;

      const points = dataPoints.map((value, index) => {
        const x = xScale(index);
        const y = yScale(value);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');

      const areaPath = `${points} L ${xScale(dataPoints.length - 1)} ${yScale(0)} L ${xScale(0)} ${yScale(0)} Z`;

      return (
        <path
          d={areaPath}
          fill={color}
          fillOpacity="0.1"
        />
      );
    };

    const inboundData = data.map(d => d.inbound);
    const outboundData = data.map(d => d.outbound);

    return (
      <svg width={width} height={height} className="w-full">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <g key={i}>
            <line
              x1={margin.left}
              y1={margin.top + ratio * chartHeight}
              x2={width - margin.right}
              y2={margin.top + ratio * chartHeight}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x={margin.left - 10}
              y={margin.top + ratio * chartHeight + 4}
              textAnchor="end"
              fontSize="12"
              fill="#6b7280"
            >
              {Math.round(maxValue * (1 - ratio))}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {data.map((item, index) => (
          <text
            key={index}
            x={xScale(index)}
            y={height - 10}
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
            transform={`rotate(-45 ${xScale(index)} ${height - 10})`}
          >
            {item.label}
          </text>
        ))}

        {/* Area fills */}
        {createArea(inboundData, '#3b82f6')}
        {createArea(outboundData, '#10b981')}

        {/* Lines */}
        {createPath(inboundData, '#3b82f6')}
        {createPath(outboundData, '#10b981')}

        {/* Data points */}
        {inboundData.map((value, index) => (
          <circle
            key={`inbound-${index}`}
            cx={xScale(index)}
            cy={yScale(value)}
            r="4"
            fill="#3b82f6"
            stroke="white"
            strokeWidth="2"
          />
        ))}
        {outboundData.map((value, index) => (
          <circle
            key={`outbound-${index}`}
            cx={xScale(index)}
            cy={yScale(value)}
            r="4"
            fill="#10b981"
            stroke="white"
            strokeWidth="2"
          />
        ))}
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Vehicle Movement Chart</h3>
          <div className="flex space-x-2">
            {periods.map((p) => (
              <button
                key={p.value}
                onClick={() => handlePeriodChange(p.value)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  period === p.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading chart data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Vehicle Movement Chart</h3>
          <div className="flex space-x-2">
            {periods.map((p) => (
              <button
                key={p.value}
                onClick={() => handlePeriodChange(p.value)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  period === p.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={() => fetchData(period)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Vehicle Movement Chart</h3>
          <div className="flex space-x-2">
            {periods.map((p) => (
              <button
                key={p.value}
                onClick={() => handlePeriodChange(p.value)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  period === p.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="text-center py-8 text-gray-500">
          No movement data available for the selected period
        </div>
      </div>
    );
  }

  const getChartTitle = () => {
    switch (period) {
      case 'today':
        return 'Today\'s Vehicle Movements (Hourly)';
      case '7days':
        return 'Last 7 Days Vehicle Movements';
      case 'monthly':
        return 'Monthly Vehicle Movements (Last 12 Months)';
      case 'yearly':
        return 'Yearly Vehicle Movements (Last 5 Years)';
      default:
        return 'Vehicle Movement Chart';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">{getChartTitle()}</h3>
        <div className="flex space-x-2">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => handlePeriodChange(p.value)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                period === p.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Line Graph */}
      <div className="flex justify-center mb-6">
        {renderLineGraph()}
      </div>
      
      {/* Data Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {data.reduce((sum, item) => sum + item.inbound, 0)}
          </div>
          <div className="text-sm text-blue-800">Total Inbound</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {data.reduce((sum, item) => sum + item.outbound, 0)}
          </div>
          <div className="text-sm text-green-800">Total Outbound</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span className="text-sm text-gray-700">Inbound</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span className="text-sm text-gray-700">Outbound</span>
        </div>
      </div>
    </div>
  );
};

export default MovementChart; 