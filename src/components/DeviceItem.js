import React, { useEffect, useState } from "react";
import {
  TIME_SPANS,
  WATT_PREFIXES,
  ACTION_TYPES,
} from "../components/GlobalVariables";

export default function DeviceItem({ device, idx, len, dispatch }) {
  const [name, setName] = useState(device.name);
  const [hours, setHours] = useState(device.hours);
  const [timeSpan, setTimeSpan] = useState(device.timeSpan);
  const [watts, setWatts] = useState(device.watts);
  const [wattPrefix, setWattPrefix] = useState(device.wattPrefix);

  useEffect(() => {
    setName(device.name);
    setHours(device.hours);
    setTimeSpan(device.timeSpan);
    setWatts(device.watts);
    setWattPrefix(device.wattPrefix);
  }, [device]);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.EDIT,
      idx: idx,
      device: {
        name: name,
        hours: hours,
        timeSpan: timeSpan,
        watts: watts,
        wattPrefix: wattPrefix,
      },
    });
  }, [name, hours, timeSpan, watts, wattPrefix, idx, dispatch]);

  useEffect(() => {
    console.log("len: ", len);
  }, [len]);

  const handleName = (e) => {
    const nameValue = e.target.value;
    if (idx === len - 1 && nameValue !== "")
      dispatch({ type: ACTION_TYPES.ADD });
    if (nameValue.length > 10) return;
    setName(nameValue);
  };

  const handleHours = (e) => {
    const hoursValue = e.target.value;
    if (hoursValue < 0) return;
    else if (timeSpan === TIME_SPANS.DAY && hoursValue > 24) return;
    else if (timeSpan === TIME_SPANS.WEEK && hoursValue > 168) return;
    else if (timeSpan === TIME_SPANS.MONTH && hoursValue > 730) return;
    setHours(hoursValue);
  };

  const handleTimeSpan = (e) => {
    switch (e.target.value) {
      case TIME_SPANS.DAY:
        setTimeSpan(TIME_SPANS.DAY);
        if (hours > 24) setHours(24);
        break;
      case TIME_SPANS.WEEK:
        setTimeSpan(TIME_SPANS.WEEK);
        if (hours > 168) setHours(168);
        break;
      case TIME_SPANS.MONTH:
        setTimeSpan(TIME_SPANS.MONTH);
        if (hours > 730) setHours(730);
        break;

      default:
        setTimeSpan(TIME_SPANS.DEFAULT);
        break;
    }
  };

  const handleWatts = (e) => {
    const wattsValue = e.target.value;
    if (wattsValue >= 0) setWatts(wattsValue);
  };

  const handleWattPrefix = (e) => {
    switch (e.target.value) {
      case WATT_PREFIXES.NONE:
        setWattPrefix(WATT_PREFIXES.NONE);
        break;
      case WATT_PREFIXES.KILO:
        setWattPrefix(WATT_PREFIXES.KILO);
        break;
      default:
        setWattPrefix(WATT_PREFIXES.NONE);
        break;
    }
  };

  return (
    <div
      className={`m-1 p-0 w-fit border-2 rounded-lg border-slate-50/20 bg-slate-500/10 text-slate-100 sx:grid md:flex drop-shadow-2xl ${
        idx === len - 1 && idx !== 0 ? "opacity-50" : ""
      }`}
    >
      <div className="m-2 mb-3 mx-4">
        <label className="block font-bold ">Název spotřebiče</label>
        <input
          className={`px-4 py-1 rounded-lg text-center w-32 bg-slate-500/40 ${
            name === "" && (idx !== len - 1 || idx === 0)
              ? "border-rose-800 bg-rose-100"
              : ""
          }`}
          type="text"
          placeholder={name}
          name="name"
          value={name}
          onChange={handleName}
          onFocus={(e) => (e.target.value = "")}
          onBlur={(e) => (e.target.value = name)}
        />
      </div>

      <div className="m-2 mb-3 mx-4 md:mx-6">
        <label className="block font-bold">Doba v provozu</label>
        <div className="flex md:justify-center items-center">
          <input
            className="form-input px-4 py-1 rounded-lg w-24 text-center bg-slate-500/40"
            type="number"
            name="hours"
            value={hours}
            onChange={handleHours}
            step="1"
          />
          <span className="mx-1"> hodin </span>

          <select
            className="rounded-lg py-1 bg-slate-500/40"
            id="timeSpan"
            value={timeSpan}
            onChange={handleTimeSpan}
          >
            <option>{TIME_SPANS.DAY}</option>
            <option>{TIME_SPANS.WEEK}</option>
            <option>{TIME_SPANS.MONTH}</option>
          </select>
        </div>
      </div>

      <div className="m-2 mb-3 mx-4">
        <label className="block font-bold">Příkon spotřebiče</label>
        <div className="flex md:justify-center">
          <input
            className="mr-1 form-input px-4 py-1 rounded-lg w-24 text-center bg-slate-500/40"
            type="number"
            name="watts"
            value={watts}
            onChange={handleWatts}
            step="10"
          />

          <select
            className="rounded-lg py-1 bg-slate-500/40"
            value={wattPrefix}
            onChange={handleWattPrefix}
          >
            <option>{WATT_PREFIXES.NONE}</option>
            <option>{WATT_PREFIXES.KILO}</option>
          </select>
        </div>
      </div>
      {idx === len - 1 ? null : (
        <div className="m-2 mx-4 flex justify-center">
          <button
            className="my-3 border rounded-lg p-1 border-rose-800 bg-rose-500/70 w-full flex justify-center items-center"
            onClick={() => {
              dispatch({ type: ACTION_TYPES.DELETE, idx: idx });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

/*
      <div className="text-slate-600 text-xs">
        {idx} {JSON.stringify(device)}
      </div>

      <button
          className="ml-3 border rounded-lg p-1 border-blue-800 bg-blue-100"
          onClick={() => {
            dispatch({ type: ACTION_TYPES.CLEAR, idx: idx });
          }}
        >
          Resetovat
      </button>

            {idx === len - 1 ? null : (
        <button
          className="ml-3 border rounded-lg p-1 border-rose-800 bg-rose-100"
          onClick={() => {
            dispatch({ type: ACTION_TYPES.DELETE, idx: idx });
          }}
        >
          X
        </button>
      )}
*/
