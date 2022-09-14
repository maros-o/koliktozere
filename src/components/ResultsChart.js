import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

export default function ResultsChart({ devices }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({
      labels: devices.map((dev) => dev.name),
      datasets: [
        {
          label: "Spotřeba",
          data: devices.map((dev) => Math.round(dev.cost)),
          backgroundColor: [
            "rgb(240, 240, 100)",
            "rgb(200, 50, 200)",
            "rgb(100, 240, 200)",
          ],
          borderColor: "rgb(40, 40, 40)",
          borderWidth: "3",
        },
      ],
    });
  }, [devices]);

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  const options = {
    plugins: {
      datalabels: {
        color: "black",
        font: { size: "12", weight: "" },
        formatter: function (value, context) {
          return devices[context.dataIndex]
            ? devices[context.dataIndex].name + ": " + value + " Kč"
            : "";
        },
      },
    },
  };

  return (
    <div className="grid justify-items-center">
      <div className="w-1/2">
        {data ? (
          <Pie data={data} options={options} plugins={[ChartDataLabels]} />
        ) : null}
      </div>
    </div>
  );
}