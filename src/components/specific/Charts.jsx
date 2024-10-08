import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as chartJS,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import { getLastDays } from "../../lib/features";

chartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);
const labels = getLastDays();

const LineChartsOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineCharts = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Data",
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(0, 0, 0, 0.4)",
      },
    ],
  };
  return <Line data={data} options={LineChartsOptions} />;
};
const DoughnutChartsOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
};

const DoughnutCharts = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,

        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(0, 0, 0, 0.4)"],
        borderColor: ["rgba(0, 0, 0, 0.4)", "rgba(75, 192, 192, 0.2)"],
        offset: 10,
      },
    ],
  };

  return <Doughnut style={{zIndex:10}} data={data} options={DoughnutChartsOptions} />;
};

export { LineCharts, DoughnutCharts };
