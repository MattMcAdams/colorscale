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
    <div
      id={props.name + "InputField"}
      className="space-y-2"
    >
      <Label htmlFor={props.name + "Input"}>{props.label}</Label>
      <select
        name="easing"
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
