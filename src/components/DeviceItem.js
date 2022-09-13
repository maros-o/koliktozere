import React, { useState } from "react";

export const TIME_SPANS = {
  DAY: "denně",
  WEEK: "týdně",
  MONTH: "měsíčně",
  DEFAULT: "denně",
};

export const WATT_PREFIXES = {
  NONE: "W",
  KILO: "kW",
};

export default function DeviceItem() {
  const [name, setName] = useState("");
  const [hours, setHours] = useState(8);
  const [timeSpan, setTimeSpan] = useState(TIME_SPANS.DEFAULT);
  const [watts, setWatts] = useState(200);
  const [wattPrefix, setWattPrefix] = useState(WATT_PREFIXES.NONE);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleHours = (e) => {
    const hours = e.target.value;
    if (hours >= 0) setHours(hours);
  };

  const handleTimeSpan = (e) => {
    switch (e.target.value) {
      case TIME_SPANS.DAY:
        setTimeSpan(TIME_SPANS.DAY);
        break;
      case TIME_SPANS.WEEK:
        setTimeSpan(TIME_SPANS.WEEK);
        break;
      case TIME_SPANS.MONTH:
        setTimeSpan(TIME_SPANS.MONTH);
        break;
      default:
        setTimeSpan(TIME_SPANS.DEFAULT);
        break;
    }
  };

  const handleWatts = (e) => {
    const watts = e.target.value;
    if (watts >= 0) setWatts(watts);
  };

  const handleWattPrefix = (e) => {
    switch (e.target.value) {
      case WATT_PREFIXES.NONE:
        setWattPrefix(TIME_SPANS.NONE);
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
    <form className="m-2 border border-neutral-500 border-2 rounded-lg p-3">
      <label className="m-1">
        <input
          className="form-input px-4 py-1 rounded-lg text-center w-32"
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />
      </label>

      <label className="m-1">
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

      <label className="m-1">
        <select
          className="rounded-lg py-1"
          id="timeSpan"
          onChange={handleTimeSpan}
        >
          <option>{TIME_SPANS.DAY}</option>
          <option>{TIME_SPANS.WEEK}</option>
          <option>{TIME_SPANS.MONTH}</option>
        </select>
      </label>

      <label className="m-1">
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
          onChange={handleWattPrefix}
        >
          <option>{WATT_PREFIXES.NONE}</option>
          <option>{WATT_PREFIXES.KILO}</option>
        </select>
      </label>
    </form>
  );
}
