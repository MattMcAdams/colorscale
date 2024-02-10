"use client";

import { ChangeEvent } from "react";
import { useSessionContext } from "../data/session";

const DarknessInput = () => {
  const Session = useSessionContext();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    Session.updateDarkRotation(value);
  }

  return (
    <div id="darkRotationInputField" className="space-y-2">
      <label
        htmlFor="darkRotationInput"
        className="block font-mono font-bold text-base"
      >
        Dark color hue shift
      </label>
      <div className="flex">
        <input
          className="font-mono text-3xl font-light text-gray-700"
          style={{ maxWidth: "min-content", flexShrink: 1 }}
          type="number"
          min="-360"
          max="360"
          id="darkRotationInput"
          value={Session.darkRotation}
          onChange={handleChange}
        />
        <span className="font-mono text-3xl font-light text-gray-400">
          &deg;
        </span>
      </div>
      <input
        aria-hidden="true"
        type="range"
        min="-360"
        max="360"
        value={Session.darkRotation}
        onChange={handleChange}
      />
    </div>
  );
};

export default DarknessInput;
