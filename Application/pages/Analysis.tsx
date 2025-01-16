import React, { useState, useEffect, useRef } from "react";
import { Line, Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  BarElement, 
  Interaction
} from "chart.js";

import data from '../back-end/data.json';
import './Analysis.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export default function Analysis() {
  const [chartData, setChartData] = useState<any>(null);
  const [chartType, setChartType] = useState('line');
  const chartRef = useRef<any>(null);

  useEffect(() => {
    // Get country names for Y-axis labels
    const countryLabels = data.map(item => item.label);
    
    // Create one dataset per disease
    const datasets = data[0].diseases.map((disease, diseaseIndex) => {
      return {
        label: disease.name,
        data: data.map(country => country.diseases[diseaseIndex].value),
        borderColor: `hsl(${diseaseIndex * 360 / data[0].diseases.length}, 70%, 50%)`,
        backgroundColor: `hsla(${diseaseIndex * 360 / data[0].diseases.length}, 70%, 50%, 0.5)`,
        borderWidth: 2,
        tension: 0.1,
        showLine: false,
        display: false,
        pointRadius: 3.5,
        hidden: true,

      };
    });

    setChartData({
      labels: countryLabels,
      datasets: datasets
    });
  }, []);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }
  }, [chartType]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const options = {
    indexAxis: 'y' as const, // This makes the chart horizontal
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Cases'
        },
        beginAtZero: true
      },
      y: {
        title: {
          display: true,
          text: 'Countries'
        },
        ticks: {
          maxTicksLimit: 50,  // Ensure the y-axis has enough ticks
          autoSkip: false      // Prevents auto-skipping of labels
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        title: {
          display: true,
          text: 'Diseases'
        }
      },
      title: {
        display: true,
        text: 'Disease Distribution by Country'
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      intersect: false
    },
    tooltips: {
      enabled: false
    }
  };


  const handleButtonClick = (type: string) => {
    setChartType(type);
  };

  let chartComponent: any;
  switch (chartType) {
    case 'bar':
      chartComponent = <Bar key="bar" ref={chartRef} data={chartData} options={options} />;
      break;
    case 'line':
    default:
      chartComponent = <Line key="line" ref={chartRef} data={chartData} options={options} />;
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