import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

export default function ResultsChart({ devices }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({
      labels: devices.map((dev) => dev.name),
      datasets: [
        {
          label: "spotřebiče",
          data: devices.map((dev) => Math.round(dev.cost)),
          backgroundColor: [
            "rgb(204, 235, 255)",
            "rgb(102, 194, 255)",
            "rgb(153, 220, 255)",
            "rgb(77, 164, 255)",
            "rgb(120, 184, 255)",
          ],
          borderColor: "rgb(100, 100, 100)",
          borderWidth: "3",
        },
      ],
    });
  }, [devices]);

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "rgb(220, 240, 255)",
        },
      },
      datalabels: {
        color: "rgb(0, 40, 80)",
        font: { size: "17", weight: "bold" },
        formatter: function (value, context) {
          if (value > 0)
            return devices[context.dataIndex]
              ? devices[context.dataIndex].name // + ": " + value + " Kč"
              : "";
          else return "";
        },
      },
    },
  };

  return (
    <div className="grid justify-items-center">
      <div className="w-1/2 max-w-md">
        {data ? (
          <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
        ) : null}
      </div>
    </div>
  );
}
