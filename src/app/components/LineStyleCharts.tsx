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
      label: '1+ hours',
      data: labels.map(() => Utils.rand(-100, 100)),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.CHART_COLORS.red,
      fill: false,
      tension: 0.4,  // Controls the smoothness of the line
      borderWidth: 2,
      pointStyle: 'rect', // Shape of the data points
      pointRadius: 6, // Radius of the data points
      pointHoverRadius: 8, // Radius of the data points on hover
      borderDash: [5, 5], // Creates dashed lines
      borderJoinStyle: 'round', // Controls the style of the line joining points
    },
    {
      label: '4+ hours',
      data: labels.map(() => Utils.rand(-100, 100)),
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.CHART_COLORS.blue,
      fill: false,
      tension: 0.1, // Less smoothness for this line
      borderWidth: 2,
      pointStyle: 'circle',
      pointRadius: 4,
      pointHoverRadius: 6,
      borderDash: [], // Solid line
      borderJoinStyle: 'miter', // Sharper line joins
    },
  ],
};

export default function LineStylingChart() {
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
                text: 'No. of hours user active daily',
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
    <div  style={{height:'100%', width:"100%" }} >
      <canvas ref={chartRef} />
    </div>
  );
}
