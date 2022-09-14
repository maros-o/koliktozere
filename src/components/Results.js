import React from "react";
import ResultsChart from "./ResultsChart";

export default function Results({ results }) {
  return (
    <div className="text-xl m-2 border rounded text-center">
      Za elektřinu měsíčně zaplatíte přibližně {Math.round(results.totalCost)}{" "}
      Kč
      <ResultsChart devices={results.devices} />
    </div>
  );
}

/*
<div className="text-slate-600 text-xs w-max">
        {JSON.stringify(results.devices)}
      </div>
*/
