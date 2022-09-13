import React, { useState } from "react";
import EnergyPriceForm from "../components/EnergyPriceForm";
import DeviceList from "../components/DeviceList";

export default function Home() {
  const [energyPrice, setEnergyPrice] = useState(7);

  const handleEnergyPriceForm = (e) => {
    const price = e.target.value;
    if (price > 0) setEnergyPrice(price);
  };

  return (
    <div className="grid content-center justify-center font-mono m-0 border">
      <div className="text-4xl font-semibold text-center m-4 border rounded">
        KolikToŽere.cz
      </div>
      <EnergyPriceForm
        energyPrice={energyPrice}
        handleEnergyPriceForm={handleEnergyPriceForm}
      />
      <DeviceList />
    </div>
  );
}
