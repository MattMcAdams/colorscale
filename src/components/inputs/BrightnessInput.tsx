"use client";

import { ChangeEvent } from "react";
import { useSessionContext } from "../../data/session";
import EasingInput from "./EasingInput";

const DarknessInput = (props: {type: 'light' | 'dark'}) => {
  const Session = useSessionContext();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    Session.updateBrightness(props.type, value);
  }

  return (
    <div id={props.type + "BrightnessInputField"} className="space-y-2">
      <label
        htmlFor={props.type + "BrightnessInput"}
        className="block mb-2 text-sm font-bold text-gray-900 font-mono"
      >
        {props.type === "light" ? "Light" : "Dark"}ness
      </label>
      <div className="flex">
        <input
          className="rounded-none rounded-e-0 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 rounded-s-lg"
          type="number"
          min="0"
          max="100"
          id={props.type + "BrightnessInput"}
          value={props.type === "light" ? Session.lightness : Session.darkness}
          onChange={handleChange}
        />
        <span className="inline-flex rounded-e-lg items-center px-3 text-sm text-gray-900 bg-gray-200  border-gray-300">
          <span className="w-4 h-5 font-bold text-gray-500">%</span>
        </span>
      </div>
      <input
        aria-hidden="true"
        className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
        type="range"
        min="0"
        max="100"
        value={props.type === "light" ? Session.lightness : Session.darkness}
        onChange={handleChange}
      />
      <EasingInput type={props.type} property="brightness" />
    </div>
  );
};

export default DarknessInput;
