
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '@/utils/arrCalculations';

interface MetricsDonutChartProps {
  arpu: number;
  ltv: number;
  cac: number;
}

const MetricsDonutChart: React.FC<MetricsDonutChartProps> = ({ arpu, ltv, cac }) => {
  const data = [
    { name: 'ARPU', value: arpu },
    { name: 'LTV', value: ltv },
    { name: 'CAC', value: cac },
  ];

  const COLORS = ['#245e4f', '#7ac9a7', '#e9c46a'];
  
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => formatCurrency(Number(value))}
            contentStyle={{ backgroundColor: '#fff', borderColor: '#245e4f' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsDonutChart;
