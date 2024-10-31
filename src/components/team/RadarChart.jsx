import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

// Register the required components with Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function RadarChart({ dataset }) {
  const data = {
    labels: ["Micro", "Macro", "Mindset", "Strategy", "Creeping"],
    datasets: [
      {
        label: "donkey Points",
        data: dataset,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, .5)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)"
      }
    ]
  };

  // Chart options
  const options = {
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 20,
        pointLabels: {
          font: { size: 16, weight: "bold" },
          color: "#000000"
        },
        ticks: {
          display: false,
          stepSize: 5
        },
        grid: {
          color: "rgba(0, 0, 0, 0.2)", // Customize grid line color
          lineWidth: 2 // Set thickness for all grid lines
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,

        callbacks: {
          label: (tooltipItem) => {
            return tooltipItem.raw; // Show only the value
          },
          title: () => {
            return ""; // Optionally remove the title (label name)
          }
        },
        displayColors: false
      },
      thickOuterLine: true
    }
  };
  return (
    <section className="radar-chart">
      <h3>Donkey Points</h3>
      <Radar data={data} options={options} className="chart" />
    </section>
  );
}

export default RadarChart;
