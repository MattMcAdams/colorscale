"use client";

import { ChangeEvent } from "react";
import { useSessionContext } from "../data/session";

const DarknessInput = () => {
  const Session = useSessionContext();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    Session.updateDarkness(value);
  }

  return (
    <div id="darknessInputField" className="space-y-2">
      <label
        htmlFor="darknessInput"
        className="block font-mono font-bold text-base"
      >
        Darkness
      </label>
      <div className="flex">
        <input
          className="font-mono text-3xl font-light text-gray-700"
          style={{maxWidth: "min-content", flexShrink: 1}}
          type="number"
          min="0"
          max="100"
          id="darknessInput"
          value={Session.darkness}
          onChange={handleChange}
        />
        <span className="font-mono text-3xl font-light text-gray-400">%</span>
      </div>
    </div>
  );
}

export default DarknessInput;
