"use client";
import { Bar, BarChart, Line, LineChart, Pie, PieChart } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

export default function Charts() {
  const data = [
    { month: "Jan", desktop: 120, mobile: 80 },
    { month: "Feb", desktop: 150, mobile: 100 },
    { month: "Mar", desktop: 180, mobile: 120 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop Users",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Mobile Users",
      color: "var(--chart-2)",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <ChartContainer>
        <BarChart data={data}>
          <Bar dataKey="desktop" fill={chartConfig.desktop.color} />
          <Bar dataKey="mobile" fill={chartConfig.mobile.color} />
          <ChartTooltip />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
