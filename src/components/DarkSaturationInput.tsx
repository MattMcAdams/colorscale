"use client";

import { ChangeEvent } from "react";
import { useSessionContext } from "../data/session";

const DarknessInput = () => {
  const Session = useSessionContext();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    Session.updateDarkSaturation(value);
  }

  return (
    <div id="darkSaturationInputField" className="space-y-2">
      <label
        htmlFor="darkSaturationInput"
        className="block font-mono font-bold text-base"
      >
        Dark color saturation
      </label>
      <div className="flex">
        <input
          className="font-mono text-3xl font-light text-gray-700"
          style={{ maxWidth: "min-content", flexShrink: 1 }}
          type="number"
          min="-100"
          max="100"
          id="darkSaturationInput"
          value={Session.darkSaturation}
          onChange={handleChange}
        />
        <span className="font-mono text-3xl font-light text-gray-400">
          &deg;
        </span>
      </div>
      <input
        aria-hidden="true"
        type="range"
        min="-100"
        max="100"
        value={Session.darkSaturation}
        onChange={handleChange}
      />
    </div>
  );
};

export default DarknessInput;
