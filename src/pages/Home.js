import React from "react";
import EnergyCost from "../components/EnergyCost";
import DeviceList from "../components/DeviceList";

export default function Home() {
  return (
    <div className="grid content-center justify-center font-mono">
      <div className="text-4xl font-semibold border text-center m-4">KolikToŽere.cz</div>
      <EnergyCost />
      <DeviceList />
    </div>
  );
}
