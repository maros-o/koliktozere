import React from "react";
import DeviceItem from "./DeviceItem";

export default function DeviceList({ devices, dispatch }) {
  return (
    <div className="grid justify-items-center bg-slate-100 pb-5">
      <div className="text-2xl text-center m-2">Spotřebiče</div>
      <div className="grid justify-items-left">
        {devices.map((dev, idx) => {
          return (
            <DeviceItem
              key={idx}
              device={dev}
              idx={idx}
              len={devices.length}
              dispatch={dispatch}
            />
          );
        })}
      </div>
    </div>
  );
}
