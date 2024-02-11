"use client";

import { ChangeEvent } from "react";
import { useSessionContext } from "../../data/session";
import EasingInput from "./EasingInput";

const RotationInput = (props: {type: 'light' | 'dark'}) => {
  const Session = useSessionContext();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    Session.updateRotation(props.type, value);
  }

  return (
    <div id={props.type + "RotationInputField"} className="space-y-2">
      <label
        htmlFor={props.type + "RotationInput"}
        className="block mb-2 text-sm font-bold text-gray-900 font-mono"
      >
        {props.type === 'light' ? 'Light' : 'Dark'} color hue shift
      </label>
      <div className="flex">
        <input
          className="rounded-none rounded-e-0 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 rounded-s-lg"
          type="number"
          min="-360"
          max="360"
          id="darkRotationInput"
          value={props.type === 'light' ? Session.lightRotation : Session.darkRotation}
          onChange={handleChange}
        />
        <span className="inline-flex rounded-e-lg items-center px-3 text-sm text-gray-900 bg-gray-200  border-gray-300">
          <span className="w-4 h-5 font-bold text-gray-500">&deg;</span>
        </span>
      </div>
      <input
        aria-hidden="true"
        className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
        type="range"
        min="-360"
        max="360"
        value={props.type === 'light' ? Session.lightRotation : Session.darkRotation}
        onChange={handleChange}
      />
      <EasingInput type={props.type} property="hue" />
    </div>
  );
};

export default RotationInput;
