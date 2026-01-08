import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function Linecharts() {
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/chart/line-chart-data`
      );
      setChartData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            padding: "4px",
            backgroundColor: "#0f172a",
            borderRadius: "10px",
            color: "#fff",
          }}
        >
          <p>{`Month: ${payload[0].payload.month}`}</p>
          <p>{`Posts: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart
        data={chartData}
        margin={{ right: 30, top: 30, bottom: 20, left: -10 }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomToolTip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="posts"
          stroke="#2563eb"
          name="Number of Posts"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
