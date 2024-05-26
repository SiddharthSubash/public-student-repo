import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
        label: "Population",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        minBarLength: 10,
      },
    ],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://cs464p564-frontend-api.vercel.app/api/countries")
      .then((response) => {
        const labels = response.data.map((country) => country.name);
        const data = response.data.map((country) => country.population);
        setChartData({
          labels,
          datasets: [
            {
              label: "Population",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              minBarLength: 10,
            },
          ],
        });
      })
      .catch((err) => {
        console.error("Error fetching population data:", err);
        setError("Failed to load population data");
      });
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ position: "relative", paddingTop: "90px" }}>
      <h1 style={{ textAlign: "center" }}>
        Population of South American Countries
      </h1>
      <div style={{ position: "relative", height: "500px" }}>
        <Bar
          data={chartData}
          options={chartOptions}
          style={{ position: "absolute" }}
        />
      </div>
    </div>
  );
};

export default PopulationChart;
