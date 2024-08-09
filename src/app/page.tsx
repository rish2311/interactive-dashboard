'use client'
import React, { useState } from "react";
import dynamic from "next/dynamic";
import ChartSelector from "./components/ChartSelector";

// Use dynamic imports for chart components
const LineChart = dynamic(() => import("./components/LineCharts"), {
  loading: () => <p>Loading...</p>, // Optional: Provide a fallback while loading
});
const SteppedLineChart = dynamic(() => import("./components/SteppedChart"), {
  loading: () => <p>Loading...</p>,
});
const LineStylingChart = dynamic(() => import("./components/LineStyleCharts"), {
  loading: () => <p>Loading...</p>,
});
const BarsCharts = dynamic(() => import("./components/BarsCharts"), {
  loading: () => <p>Loading...</p>,
});
const RadarChart = dynamic(() => import("./components/SteppedRadarChart"), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  const [chartVisibility, setChartVisibility] = useState({
    LineChart: true,
    SteppedLineChart: true,
    LineStylingChart: true,
    BarsCharts: true,
    RadarChart: true,
  });

  const handleVisibilityChange = (chart: string) => {
    setChartVisibility((prevVisibility) => ({
      ...prevVisibility,
      //@ts-ignore
      [chart]: !prevVisibility[chart],
    }));
  };

  return (
    <main className="text-center pt-14">
      <div className="container mx-auto p-6 bg-gray-100">
        <div className="flex items-start justify-around">
          <h1 className="text-3xl font-bold mb-8">DASHBOARD</h1>
          <ChartSelector
            chartVisibility={chartVisibility}
            onVisibilityChange={handleVisibilityChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {chartVisibility.LineChart && (
            <div className="p-8 md:p-9 bg-white rounded-lg shadow-md transition-all duration-500">
              <LineChart />
              <p className="mt-2 text-gray-600">Sales</p>
            </div>
          )}
          {chartVisibility.SteppedLineChart && (
            <div className="p-8 md:p-9 bg-white rounded-lg shadow-md transition-all duration-500">
              <SteppedLineChart />
              <p className="mt-2 text-gray-600">Expenses</p>
            </div>
          )}
          {chartVisibility.LineStylingChart && (
            <div className="p-8 md:p-9 bg-white rounded-lg shadow-md transition-all duration-500">
              <LineStylingChart />
              <p className="mt-2 text-gray-600">Profit</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chartVisibility.BarsCharts && (
            <div className="p-8 md:p-9 bg-white rounded-lg shadow-md h-[60vh] transition-all duration-500">
              <BarsCharts />
              <p className="mt-2 text-gray-600">Monthly Sales</p>
            </div>
          )}
          {chartVisibility.RadarChart && (
            <div className="p-8 md:p-9 bg-white rounded-lg shadow-md h-[60vh] transition-all duration-500">
              <RadarChart />
              <p className="mt-2 text-gray-600">Department Sales</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
