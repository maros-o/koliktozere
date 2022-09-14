import React, { useEffect, useState } from "react";
import {
  TIME_SPANS,
  WATT_PREFIXES,
  ACTION_TYPES,
} from "../components/GlobalVariables";

export default function DeviceItem({ device, idx, dispatch }) {
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
  }, [name, hours, timeSpan, watts, wattPrefix, dispatch, idx]);

  const handleName = (e) => {
    const nameValue = e.target.value;
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
    <div className="my-2 border-neutral-500 border-2 rounded-lg p-3 w-fit">
      <label className="m-1">
        <input
          className="form-input px-4 py-1 rounded-lg text-center w-32"
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          onFocus={(e) => (e.target.value = "")}
          onBlur={(e) => (e.target.value = name)}
        />
      </label>

      <label className="m-1 mr-0 ml-4">
        <input
          className="form-input px-4 py-1 rounded-lg w-24 text-center"
          type="number"
          name="hours"
          value={hours}
          onChange={handleHours}
          step="1"
        />
        <span> hodin </span>
      </label>

      <label className="m-1 ml-0">
        <select
          className="rounded-lg py-1"
          id="timeSpan"
          value={timeSpan}
          onChange={handleTimeSpan}
        >
          <option>{TIME_SPANS.DAY}</option>
          <option>{TIME_SPANS.WEEK}</option>
          <option>{TIME_SPANS.MONTH}</option>
        </select>
      </label>

      <label className="m-1 ml-4">
        <input
          className="form-input px-4 py-1 rounded-lg w-24 text-center"
          type="number"
          name="watts"
          value={watts}
          onChange={handleWatts}
          step="10"
        />
      </label>

      <label className="m-1">
        <select
          className="rounded-lg py-1"
          id="wattPrefix"
          value={wattPrefix}
          onChange={handleWattPrefix}
        >
          <option>{WATT_PREFIXES.NONE}</option>
          <option>{WATT_PREFIXES.KILO}</option>
        </select>
      </label>
      <button
        className="ml-3 border rounded-lg p-1 border-rose-800 bg-rose-100"
        onClick={() => {
          dispatch({ type: ACTION_TYPES.DELETE, idx: idx });
        }}
      >
        Odebrat
      </button>
    </div>
  );
}

/*
      <div className="text-slate-600 text-xs">
        {idx} {JSON.stringify(device)}
      </div>
*/
