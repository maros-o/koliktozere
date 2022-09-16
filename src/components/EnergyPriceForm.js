import React from "react";

export default function EnergyPriceForm({
  energyPrice,
  handleEnergyPriceForm,
}) {
  return (
    <div className="text-xl p-2 text-center">
      <label className="mx-2">Cena elektřiny za kW/h</label>
      <input
        className="text-md form-input px-4 py-1 rounded-lg w-16 md:w-24 text-center bg-slate-500/40 font-bold"
        type="number"
        name="price"
        value={energyPrice}
        onChange={handleEnergyPriceForm}
        step="0.1"
      />
      <label className="mx-2">Kč</label>
    </div>
  );
}
