'use client'
import React, { useEffect, useRef } from 'react';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartConfiguration,
  ChartData,
  BarController, // Import BarController
} from 'chart.js';
import Utils from './Utils';

// Register Chart.js components including BarController
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const DATA_COUNT = 7;

const labels: string[] = Utils.months({ count: DATA_COUNT });

const data: ChartData<'bar', [number, number][], string> = {
  labels: labels,
  datasets: [
    {
      label: 'Assets',
      data: labels.map(() => {
        return [Utils.rand(-100, 100), Utils.rand(-100, 100)];
      }),
      backgroundColor: Utils.CHART_COLORS.red,
    },
    {
      label: 'Expense',
      data: labels.map(() => {
        return [Utils.rand(-100, 100), Utils.rand(-100, 100)];
      }),
      backgroundColor: Utils.CHART_COLORS.blue,
    },
  ],
};

export default function BarsCharts() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const config: ChartConfiguration<'bar', [number, number][], string> = {
          type: 'bar',
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Company expense vs assets ',
              },
            },
          },
        };

        const chartInstance = new Chart(ctx, config);

        return () => {
          chartInstance.destroy();
        };
      }
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
}
