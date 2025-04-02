
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '@/utils/arrCalculations';

interface ARRGrowthChartProps {
  data: {
    year: number;
    arr: number;
  }[];
}

const ARRGrowthChart: React.FC<ARRGrowthChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value).replace('₹', '')}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value) => formatCurrency(Number(value))}
            labelFormatter={(value) => `Year: ${value}`}
            contentStyle={{ backgroundColor: '#fff', borderColor: '#245e4f' }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="arr" 
            stroke="#245e4f" 
            fill="#7ac9a7" 
            fillOpacity={0.6}
            activeDot={{ r: 6 }}
            name="Annual Recurring Revenue"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ARRGrowthChart;
