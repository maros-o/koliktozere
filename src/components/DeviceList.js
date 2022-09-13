import React from "react";
import DeviceItem from "./DeviceItem";

export default function DeviceList({ devices, dispatch }) {
  return (
    <div>
      {devices.map((dev, idx) => {
        return (
          <DeviceItem key={idx} device={dev} idx={idx} dispatch={dispatch} />
        );
      })}
    </div>
  );
}
