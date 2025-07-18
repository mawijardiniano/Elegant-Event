"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

export const description = "A bar chart showing revenue per month";

const chartData = [
  { month: "Jan", revenue: 15000, fill: "var(--color-1)" },
  { month: "Feb", revenue: 20000, fill: "var(--color-2)" },
  { month: "Mar", revenue: 18000, fill: "var(--color-3)" },
  { month: "Apr", revenue: 22000, fill: "var(--color-4)" },
  { month: "May", revenue: 27000, fill: "var(--color-5)" },
  { month: "Jun", revenue: 30000, fill: "var(--color-6)" },
  { month: "Jul", revenue: 32000, fill: "var(--color-7)" },
  { month: "Aug", revenue: 28000, fill: "var(--color-8)" },
  { month: "Sep", revenue: 24000, fill: "var(--color-9)" },
  { month: "Oct", revenue: 21000, fill: "var(--color-10)" },
  { month: "Nov", revenue: 19000, fill: "var(--color-11)" },
  { month: "Dec", revenue: 23000, fill: "var(--color-12)" },
];

export const chartConfig = {
  revenue: {
    label: "Revenue (₱)",
  },
  Jan: { label: "January", color: "var(--chart-1)" },
  Feb: { label: "February", color: "var(--chart-2)" },
  Mar: { label: "March", color: "var(--chart-3)" },
  Apr: { label: "April", color: "var(--chart-4)" },
  May: { label: "May", color: "var(--chart-5)" },
  Jun: { label: "June", color: "var(--chart-6)" },
  Jul: { label: "July", color: "var(--chart-7)" },
  Aug: { label: "August", color: "var(--chart-8)" },
  Sep: { label: "September", color: "var(--chart-9)" },
  Oct: { label: "October", color: "var(--chart-10)" },
  Nov: { label: "November", color: "var(--chart-11)" },
  Dec: { label: "December", color: "var(--chart-12)" },
} satisfies ChartConfig;

export default function ChartBarActive() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const renderCustomBar = (props: any) => {
    const { x, y, width, height, fill, index } = props;
    const isActive = index === activeIndex;
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke={isActive ? fill : undefined}
        strokeWidth={isActive ? 3 : 0}
        strokeDasharray={isActive ? "4 4" : undefined}
        fillOpacity={isActive ? 0.8 : 1}
      />
    );
  };

  return (
    <Card className="w-full h-90 mx-auto border border-gray-200">
      <CardHeader>
        <CardTitle>Revenue per Month</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart
              data={chartData}
              onMouseLeave={() => setActiveIndex(null)}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              maxBarSize={20}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={6}
                axisLine={false}
                tickFormatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label || value
                }
                height={220}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="revenue"
                radius={8}
                shape={renderCustomBar}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm -mt-54">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total revenue for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
