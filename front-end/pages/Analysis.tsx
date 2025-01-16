import React, { useState, useEffect, useRef } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from "chart.js";

// Import your JSON data
import data from './data.json'; // Adjust path if necessary
import './Analysis.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement    // For Bar charts
);

export default function Analysis() {
  const [chartData, setChartData] = useState<any>(null);
  const [chartType, setChartType] = useState('line');
  const chartRef = useRef<any>(null);  // Use useRef to store chart instance

  useEffect(() => {
    // Initialize empty datasets and labels
    const chartLabels = data.map((item: any) => item.label);
    const datasets: any[] = [];

    // Iterate over each country and its diseases to create datasets
    data.forEach((item: any) => {
      item.diseases.forEach((disease: any, index: number) => {
        // Create a dataset for each disease (one dataset per disease across countries)
        if (!datasets[index]) {
          // Initialize a new dataset for this disease if it doesn't already exist
          datasets[index] = {
            label: disease.name,
            data: [], // This will store values for the disease
            borderColor: `hsl(${(index * 40) % 360}, 70%, 50%)`, // Random color per dataset
            borderWidth: 3,
            fill: true,
            tension: 0.1,
            borderJoinStyle: 'round',
          };
        }

        // Push the disease value for this country to the correct dataset
        datasets[index].data.push(disease.value);
      });
    });

    setChartData({
      labels: chartLabels,  // Country labels
      datasets: datasets,   // Datasets (one per disease)
    });
  }, []); // Only set initial chart data once

  useEffect(() => {
    // Manually destroy the previous chart instance before rendering the new one
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }
  }, [chartType]); // Re-run this effect when chartType changes

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = (type: string) => {
    setChartType(type);
  };

  // Render the correct chart based on the selected chart type
  let chartComponent: any;
  switch (chartType) {
    case 'bar':
      chartComponent = <Bar key="bar" ref={chartRef} data={chartData} />;
      break;
    case 'line':
    default:
      chartComponent = <Line key="line" ref={chartRef} data={chartData} />;
      break;
  }

  return (
    <div className="page-container">
      <div className="button-container">
        <button id="button1" onClick={() => handleButtonClick('line')}>Line</button>
        <button id="button3" onClick={() => handleButtonClick('bar')}>Bar</button>
      </div>
      <div className="graph-container" id="graph-container">
        {chartComponent}
      </div>
    </div>
  );
}
