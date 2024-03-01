"use client";

import { ChangeEvent } from "react";
import { easingOptions } from "../../types/easing";
import Label from "./Label";

const EasingInput = (props: {
  name: string;
  label: string;
  value: easingOptions;
  changeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {

  const easingKeys = [];

  for (let option in easingOptions) {
    easingKeys.push(<option value={option}>{option}</option>);
  }

  return (
    <div id={props.name + "InputField"} className="space-y-2">
      <Label htmlFor={props.name + "Input"}>{props.label}</Label>
      <select
        name="easing"
        id={props.name + "Input"}
        className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={props.value}
        onChange={props.changeHandler}
      >
        {easingOptions.map((type) => (
          <option key={`${type}`} value={type}>
            {type}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <svg
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default EasingInput;
