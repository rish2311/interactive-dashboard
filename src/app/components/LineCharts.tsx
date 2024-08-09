'use client'
import React, { useEffect, useRef } from 'react';
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartConfiguration,
  ChartData,
  LineController,
} from 'chart.js';
import Utils from './Utils';

// Register the necessary components for a Line Chart
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const DATA_COUNT = 7;

const labels: string[] = Utils.months({ count: DATA_COUNT });

const data: ChartData<'line', number[], string> = {
  labels: labels,
  datasets: [
    {
      label: 'Active Users',
      data: labels.map(() => Utils.rand(-100, 100)),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.CHART_COLORS.red,
      fill: false,
    },
    {
      label: 'Dropping Users',
      data: labels.map(() => Utils.rand(-100, 100)),
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.CHART_COLORS.blue,
      fill: false,
    },
  ],
};

export default function LineChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const config: ChartConfiguration<'line', number[], string> = {
          type: 'line',
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'No. of users buying vs dropping rate',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Months',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Value',
                },
                min: -100,
                max: 100,
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
    <div  style={{height:'100%', width:"100%"}} >
      <canvas ref={chartRef} />
    </div>
  );
}
