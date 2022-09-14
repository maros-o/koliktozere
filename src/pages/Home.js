import React, { useEffect, useReducer, useState, useRef } from "react";
import EnergyPriceForm from "../components/EnergyPriceForm";
import DeviceList from "../components/DeviceList";
import Results from "../components/Results";
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
  const [results, setResults] = useState(null);

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

  useEffect(() => {
    const calculateResults = () => {
      let totalCost = 0;

      let resultDevices = devices.map((dev) => {
        let hoursMultiplier = 1;
        if (dev.timeSpan === TIME_SPANS.WEEK) hoursMultiplier = 4.28;
        else if (dev.timeSpan === TIME_SPANS.DAY) hoursMultiplier = 30;

        let wattsMultiplier = 0.001;
        if (dev.wattPrefix === WATT_PREFIXES.KILO) wattsMultiplier = 1;

        let devCost =
          energyPrice *
          dev.hours *
          hoursMultiplier *
          dev.watts *
          wattsMultiplier;

        totalCost += devCost;

        return {
          name: dev.name,
          cost: Math.round(devCost * 100) / 100,
        };
      });

      resultDevices = resultDevices.map((dev) => {
        return {
          ...dev,
          percentage: Math.round((dev.cost / totalCost) * 10000) / 100,
        };
      });

      setResults({
        devices: resultDevices,
        totalCost: Math.round(totalCost * 100) / 100,
      });
    };

    calculateResults();
  }, [energyPrice, devices]);

  const handleEnergyPriceForm = (e) => {
    const priceValue = e.target.value;
    if (priceValue < 0) return;
    setEnergyPrice(priceValue);
  };

  return (
    <div className="grid content-center justify-center font-mono m-0 border border-neutral-400">
      <div className="text-4xl font-semibold text-center m-4 border rounded">
        KolikToŽere.cz
      </div>
      <EnergyPriceForm
        energyPrice={energyPrice}
        handleEnergyPriceForm={handleEnergyPriceForm}
      />
      <DeviceList devices={devices} dispatch={dispatch} />
      <button
        className="border rounded-lg border-green-400 bg-green-100 w-full p-4 my-2"
        onClick={() => {
          dispatch({ type: ACTION_TYPES.ADD });
        }}
      >
        přidat spotřebič
      </button>
      {results ? <Results results={results} /> : null}
    </div>
  );
}

/*
      <button
        className="border rounded-lg border-rose-400 bg-rose-100 w-full p-4 my-2"
        onClick={() => {
          dispatch({ type: ACTION_TYPES.CLEAR });
        }}
      >
        smazat vše
      </button> 
*/
