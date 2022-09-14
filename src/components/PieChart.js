import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export default function PieChart({ devices }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({
      labels: devices.map((dev) => dev.name + " (" + Math.round(dev.cost) + " Kč)"),
      datasets: [
        {
          label: "Spotřeba",
          data: devices.map((dev) => dev.cost),
          backgroundColor: devices.map((dev) => {
            let x = dev.percentage / 100;
            let red = x * 237;
            let green = 41 + 214 - 214 * x;
            let blue = 56 + 71 - 71 * x;

            return `rgb(${red},${green},${blue})`;
          }),
          borderColor: "black",
          borderWidth: "2",
        },
      ],
    });
  }, [devices]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="grid justify-items-center">
      <div className="w-fit">{data ? <Pie data={data} /> : null}</div>
    </div>
  );
}
