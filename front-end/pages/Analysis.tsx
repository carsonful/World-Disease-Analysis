import React, { useState, useEffect, useRef } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from "chart.js";

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
  ArcElement,  // For Pie charts
  BarElement    // For Bar charts
);

export default function Analysis() {
  const [chartData, setChartData] = useState<any>(null);
  const [chartType, setChartType] = useState('line');
  const chartRef = useRef<any>(null);  // Use useRef to store chart instance

  useEffect(() => {
    // Use the imported data directly
    const chartLabels = data.map((item: any) => item.label);
    const chartValues = data.map((item: any) => item.value);
    
    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: "Example Dataset",
          data: chartValues,
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          fill: true,
        },
      ],
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
  let chartComponent;
  switch (chartType) {
    case 'pie':
      chartComponent = <Pie key="pie" ref={chartRef} data={chartData} />;
      break;
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
        <button id="button2" onClick={() => handleButtonClick('pie')}>Pie</button>
        <button id="button3" onClick={() => handleButtonClick('bar')}>Bar</button>
      </div>
      <div className="graph-container" id="graph-container">
        {chartComponent}
      </div>
    </div>
  );
}
