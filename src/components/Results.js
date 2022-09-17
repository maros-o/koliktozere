import React from "react";
import ResultsChart from "./ResultsChart";

export default function Results({ results }) {
  return (
    <div className="pb-2">
      <div className="text-xl md:text-2xl m-2 mt-5 mb-4 text-center drop-shadow-2xl px-3">
        Za elektřinu měsíčně zaplatíte přibližně {Math.round(results.totalCost)}{" "}
        Kč
      </div>
      {results.devices.length > 1 ? (
        <ResultsChart devices={results.devices} />
      ) : null}
    </div>
  );
}
