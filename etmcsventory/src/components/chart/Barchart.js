// Import necessary libraries
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data
const data = [
  { name: "January", sales: 4000, profit: 2400 },
  { name: "February", sales: 3000, profit: 1398 },
  { name: "March", sales: 2000, profit: 9800 },
  { name: "April", sales: 2780, profit: 3908 },
  { name: "May", sales: 1890, profit: 4800 },
  { name: "June", sales: 2390, profit: 3800 },
  { name: "July", sales: 3490, profit: 4300 },
];

const MyBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        {/* Add grid lines */}
        <CartesianGrid strokeDasharray="3 3" />
        {/* X-axis and Y-axis */}
        <XAxis dataKey="name" />
        <YAxis />
        {/* Tooltip for hover details */}
        <Tooltip />
        {/* Legend for bar descriptions */}
        <Legend />
        {/* Bars for sales and profit */}
        <Bar dataKey="sales" fill="#8884d8" name="Sales" />
        <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
