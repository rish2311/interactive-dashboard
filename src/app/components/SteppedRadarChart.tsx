'use client'
import React, { useEffect, useRef } from 'react';
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ChartConfiguration,
  ChartData,
} from 'chart.js';
import Utils from './Utils';

// Register the necessary components for a Radar Chart
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

const labels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

const data: ChartData<'radar', number[], string> = {
  labels: labels,
  datasets: [
    {
      label: 'Employee < 35',
      data: labels.map(() => Utils.rand(0, 100)),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      pointBackgroundColor: Utils.CHART_COLORS.red,
      pointBorderColor: '#fff',
    },
    {
      label: 'Emoplyee > 35',
      data: labels.map(() => Utils.rand(0, 100)),
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      pointBackgroundColor: Utils.CHART_COLORS.blue,
      pointBorderColor: '#fff',
    },
  ],
};

export default function RadarChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const config: ChartConfiguration<'radar', number[], string> = {
          type: 'radar',
          data: data,
          options: {
            plugins: {
              filler: {
                propagate: false,  // Ensure the fill does not propagate to other datasets
              },
              // Assuming 'samples-filler-analyser' is a custom plugin or utility you want to use
            },
            interaction: {
              intersect: false,  // Controls how the tooltip interacts with points
            },
            scales: {
              r: {
                angleLines: {
                  display: true,
                },
                suggestedMin: 0,
                suggestedMax: 100,
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
