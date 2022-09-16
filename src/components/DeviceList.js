import React from "react";
import DeviceItem from "./DeviceItem";

export default function DeviceList({ devices, dispatch }) {
  return (
    <div className="grid justify-items-center">
      <div className="text-xl text-center font-semibold m-2 drop-shadow-2xl">
        Vaše spotřebiče
      </div>
      <div className="grid justify-items-left pb-4">
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
