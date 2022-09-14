import React from "react";

export default function EnergyPriceForm( {energyPrice, handleEnergyPriceForm}) {
  return (
    <div className="m-2 border rounded text-center">
      <div className="p-2">
        <label className="mx-2">Kolik platíte za elektřinu?</label>
        <input
          className="form-input px-4 py-1 rounded-lg w-24 text-center"
          type="number"
          name="price"
          value={energyPrice}
          onChange={handleEnergyPriceForm}
          step="0.1"
        />
        <label className="mx-2">Kč za kW/h</label>
      </div>
    </div>
  );
}
