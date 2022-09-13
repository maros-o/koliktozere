import React, { useReducer, useState } from "react";
import EnergyPriceForm from "../components/EnergyPriceForm";
import DeviceList from "../components/DeviceList";

export const ACTION_TYPES = {
  ADD: "add-device",
  EDIT: "edit-device",
  REMOVE: "remove-device",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD:
      return {
        todos: [...state.todos, { text: action.text, completed: false }],
      };
    case ACTION_TYPES.EDIT:
      return {
        todos: state.todos.map((t, idx) =>
          idx === action.idx ? { ...t, completed: !t.completed } : t
        ),
        todoCount: state.todoCount,
      };
    case ACTION_TYPES.REMOVE:
      return {
        todos: state.todos.map((t, idx) =>
          idx === action.idx ? { ...t, completed: !t.completed } : t
        ),
        todoCount: state.todoCount,
      };
    default:
      return state;
  }
}

export default function Home() {
  const [energyPrice, setEnergyPrice] = useState(7);

  const [{ devices }, dispatch] = useReducer(reducer, { devices: [] });

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
      <DeviceList />
    </div>
  );
}
