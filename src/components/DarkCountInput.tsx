"use client";

import { ChangeEvent } from "react";
import { useSessionContext } from "../data/session";

const ColorInput = () => {
  const Session = useSessionContext();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    Session.updateDarkCount(value);
  }

  return (
    <div id="darkCountInputField" className="space-y-2">
      <label
        htmlFor="darkCountInput"
        className="block font-mono font-bold text-base"
      >
        Dark color steps
      </label>
      <input
        className="font-mono text-3xl font-light text-gray-700"
        type="number"
        id="darkCountInput"
        value={Session.darkCount}
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorInput;
