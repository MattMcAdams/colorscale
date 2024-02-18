"use client";

import { ChangeEvent } from "react";

const NumberInput = (props: {
  name: string;
  label: string;
  min: number;
  max: number;
  value: number;
  slider: boolean;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div id={props.name + "InputField"} className="space-y-2">
      <label
        htmlFor={props.name + "Input"}
        className="block mb-2 text-sm font-bold text-gray-900 font-mono"
      >
        {props.label}
      </label>
      <input
        className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
        type="number"
        max={props.max}
        min={props.min}
        id={props.name + "Input"}
        value={props.value}
        onChange={props.changeHandler}
      />
      {props.slider ? (
        <input
          aria-hidden="true"
          className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          type="range"
          min={props.min}
          max={props.max}
          value={props.value}
          onChange={props.changeHandler}
        />
      ) : null}
    </div>
  );
};

export default NumberInput;
