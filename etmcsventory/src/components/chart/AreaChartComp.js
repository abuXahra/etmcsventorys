import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function AreaChartComp() {
  const productData = [
    {
      name: "Jan",
      product1: 4000,
      product2: 2400,
    },
    {
      name: "Feb",
      product1: 3000,
      product2: 2210,
    },
    {
      name: "Apr",
      product1: 2780,
      product2: 2000,
    },
    {
      name: "May",
      product1: 1890,
      product2: 2181,
    },
    {
      name: "Jun",
      product1: 2390,
      product2: 2500,
    },
  ];

  const CustomToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            padding: "4px",
            backgroundColor: "#0f172a",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            borderRadius: "10px",
          }}
        >
          <p style={{ fontSize: "medium" }}>{label}</p>
          <p style={{ fontSize: "medium", color: "#22d3ee" }}>
            Product 1:
            <span style={{ margin: "2px" }}>{payload}</span>
          </p>
        </div>
      );
    }
  };

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <AreaChart
        width={500}
        height={400}
        data={productData}
        margin={{ right: 40 }}
      >
        <YAxis />
        <XAxis dataKey={"name"} />
        <CartesianGrid strokeDasharray={"5 5"} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey={"product1"}
          stroke="#2563eb"
          fill="#3b83f6"
          stackId={1}
        />
        <Area
          type="monotone"
          dataKey={"product2"}
          stroke="#7c3aed"
          fill="#8b5cf6"
          stackId={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
