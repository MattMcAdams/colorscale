"use client";

import { ChangeEvent } from "react";
import { easingOptions } from "../../types/easing";

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
    <div
      id={props.name + "InputField"}
      className="space-y-2"
    >
      <label
        htmlFor={props.name + "Input"}
        className="block mb-2 text-sm font-medium text-gray-900 font-mono hidden"
      >
        {props.label}
      </label>
      <select
        name="cars"
        id={props.name + "Input"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={props.value}
        onChange={props.changeHandler}
      >
        {easingOptions.map((type) => (
          <option key={`${type}`} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EasingInput;
