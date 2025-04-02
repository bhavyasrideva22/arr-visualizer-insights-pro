
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CustomersChartProps {
  data: {
    year: number;
    customers: number;
    newCustomers: number;
    churnedCustomers: number;
  }[];
}

const CustomersChart: React.FC<CustomersChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderColor: '#245e4f' }}
          />
          <Legend />
          <Bar 
            dataKey="customers" 
            fill="#245e4f" 
            name="Total Customers" 
          />
          <Bar 
            dataKey="newCustomers" 
            fill="#7ac9a7" 
            name="New Customers" 
          />
          <Bar 
            dataKey="churnedCustomers" 
            fill="#e9c46a" 
            name="Churned Customers" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomersChart;
