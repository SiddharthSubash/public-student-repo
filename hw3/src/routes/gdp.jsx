import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import ChartJS, { ArcElement, Tooltip, Legend } from "chart.js/auto";
import { backgroundColors, borderColors } from "../utils/chartColor";

ChartJS.register(ArcElement, Tooltip, Legend);
const GDPChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://cs464p564-frontend-api.vercel.app/api/countries")
      .then((response) => {
        const labels = response.data.map((country) => country.name);
        const data = response.data.map((country) => country.gdp_billions || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "GDP in Billions",
              data,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        console.error("Error fetching GDP data:", err);
        setError("Failed to load GDP data");
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
    <div style={{ margin: "100px", padding: "0px" }}>
      <h1>GDP of South American Countries</h1>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "600px" }}
      >
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default GDPChart;
