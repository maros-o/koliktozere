import React from "react";

export default function EnergyPriceForm({
  energyPrice,
  handleEnergyPriceForm,
}) {
  return (
    <div className="text-xl p-2 text-center drop-shadow-2xl">
      <label className="mx-3">Kolik platíte za kW/h?</label>
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
