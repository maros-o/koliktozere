import React, { useEffect, useReducer, useState, useRef } from "react";
import EnergyPriceForm from "../components/EnergyPriceForm";
import DeviceList from "../components/DeviceList";
import {
  TIME_SPANS,
  WATT_PREFIXES,
  ACTION_TYPES,
} from "../components/GlobalVariables";

const defaultDevice = {
  name: "",
  hours: 0,
  timeSpan: TIME_SPANS.DEFAULT,
  watts: 0,
  wattPrefix: WATT_PREFIXES.DEFAULT,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.INIT:
      if (localStorage.getItem("devices"))
        return { devices: JSON.parse(localStorage.getItem("devices")) };
      return { devices: [] };
    case ACTION_TYPES.ADD:
      return {
        devices: [...state.devices, defaultDevice],
      };
    case ACTION_TYPES.EDIT:
      return {
        devices: state.devices.map((dev, idx) =>
          idx === action.idx ? action.device : dev
        ),
      };
    case ACTION_TYPES.DELETE:
      return {
        devices: state.devices.filter((dev, idx) => idx !== action.idx),
      };
    case ACTION_TYPES.CLEAR:
      return {
        devices: [],
      };
    default:
      return state;
  }
}

export default function Home() {
  const [energyPrice, setEnergyPrice] = useState(7);
  const [{ devices }, dispatch] = useReducer(reducer, { devices: [] });
  const loading = useRef(true);

  useEffect(() => {
    if (!loading.current) {
      localStorage.setItem("devices", JSON.stringify(devices));
      return;
    }
    loading.current = false;
    dispatch({ type: ACTION_TYPES.INIT });
  }, [devices]);

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
      <div>
        <div className="text-2xl text-center m-2 underline border rounded">
          Spotřebiče
        </div>
        <DeviceList devices={devices} dispatch={dispatch} />
        <button
          className="border rounded-lg border-green-400 bg-green-100 w-full p-4 my-2"
          onClick={() => {
            dispatch({ type: ACTION_TYPES.ADD });
          }}
        >
          přidat spotřebič
        </button>
        <button
          className="border rounded-lg border-rose-400 bg-rose-100 w-full p-4 my-2"
          onClick={() => {
            dispatch({ type: ACTION_TYPES.CLEAR });
          }}
        >
          smazat vše
        </button>
        <button
          className="border rounded-lg border-blue-400 bg-blue-100 w-full p-4 my-2"
          onClick={() => {}}
        >
          zobrazit výsledky
        </button>
      </div>
    </div>
  );
}
