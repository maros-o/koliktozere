import React from "react";
import DeviceItem from "./DeviceItem";

export default function DeviceList({ devices, dispatch }) {
  return (
    <div className="border rounded">
      <div className="text-2xl text-center m-2 underline">
        Spotřebiče
      </div>
      <div className="grid justify-items-center">
        {devices.map((dev, idx) => {
          return (
            <DeviceItem key={idx} device={dev} idx={idx} dispatch={dispatch} />
          );
        })}
      </div>
    </div>
  );
}
