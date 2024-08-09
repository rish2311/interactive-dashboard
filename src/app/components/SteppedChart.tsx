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

// Register necessary components for a Line Chart
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const labels: string[] = Utils.months({ count: 7 });

const data: ChartData<'line', number[], string> = {
  labels: labels,
  datasets: [
    {
      label: 'starting of a month',
      data: labels.map(() => Utils.rand(-100, 100)),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.CHART_COLORS.red,
      fill: false,
      stepped: 'before', // Stepped line before the data point
      borderWidth: 2,
    },
    {
      label: 'Ending of a month',
      data: labels.map(() => Utils.rand(-100, 100)),
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.CHART_COLORS.blue,
      fill: false,
      stepped: 'after', // Stepped line after the data point
      borderWidth: 2,
    },
    {
      label: 'Middle of a month',
      data: labels.map(() => Utils.rand(-100, 100)),
      borderColor: Utils.CHART_COLORS.green,
      backgroundColor: Utils.CHART_COLORS.green,
      fill: false,
      stepped: 'middle', // Stepped line at the middle of the data point
      borderWidth: 2,
    },
  ],
};

export default function SteppedLineChart() {
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
                text: 'No. of users deleting our app',
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
