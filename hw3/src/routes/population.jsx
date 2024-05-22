import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PopulationChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Population',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://cs464p564-frontend-api.vercel.app/api/countries')
      .then((response) => {
        const labels = response.data.map((country) => country.name);
        const data = response.data.map((country) => country.population);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Population',
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        });
      })
      .catch((err) => {
        console.error('Error fetching population data:', err);
        setError('Failed to load population data');
      });
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: function (context) {
            if (window.innerWidth < 576) {
              return { size: 10 };
            } else {
              return { size: 14 };
            }
          },
          autoSkip: true,
          maxRotation: 90,
          minRotation: window.innerWidth < 576 ? 45 : 0,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ marginTop: '90px' }}>
      <h1>Population of South American Countries</h1>
      <div
        className="justify-content-center px-5"
        style={{ height: '1100px', width: '100%' }}
      >
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PopulationChart;
