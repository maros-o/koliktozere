import React from "react";

export default function EnergyCost() {
  return (
    <form className="border m-2">
      <div>
        <label className="mx-2">Kolik platíte za elektřinu?</label>
        <input
          className="form-input px-4 py-2 rounded-full w-20 text-center"
          type="number"
          name="price"
        />
        <label className="mx-2">Kč za kW/h</label>
      </div>
    </form>
  );
}
