import React from "react";
import PieChart from "./PieChart";

export default function Results({ results }) {
  return (
    <div className="text-xl m-2 border rounded text-center">
      <div className="text-slate-600 text-xs w-min">
        {JSON.stringify(results.devices)}
      </div>
      Za elektřinu měsíčně zaplatíte přibližně {results.totalCost} Kč
      <PieChart devices={results.devices} />
    </div>
  );
}
