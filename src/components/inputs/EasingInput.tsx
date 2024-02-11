"use client";

import { ChangeEvent } from "react";
import { useSessionContext } from "../../data/session";
import { easingOptions, easingOptionsType } from "../../functions/ease";

const EasingInput = (props: {
  type: "light" | "dark",
  property: 'hue' | 'saturation' | 'brightness',
}) => {
  const Session = useSessionContext();

  let value = '';
  if (props.type === 'light') {
    if (props.property === 'hue') {
      value = Session.lightRotationEasing;
    } else if (props.property === 'saturation') {
      value = Session.lightSaturationEasing;
    } else {
      value = Session.lightnessEasing;
    }
  } else {
    if (props.property === 'hue') {
      value = Session.darkRotationEasing;
    } else if (props.property === 'saturation') {
      value = Session.darkSaturationEasing;
    } else {
      value = Session.darknessEasing;
    }
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    let value = e.target.value as easingOptionsType;
    Session.updateEasing(props.type, props.property, value);
  }

  const easingKeys = [];

  for (let option in easingOptions) {
    easingKeys.push(
      <option value={option}>{option}</option>
    );
  }

  return (
    <div
      id={props.type + "_" + props.property + "CountInputField"}
      className="space-y-2"
    >
      <label
        htmlFor={props.type + "_" + props.property + "CountInput"}
        className="block mb-2 text-sm font-medium text-gray-900 font-mono hidden"
      >
        Easing
      </label>
      <select
        name="cars"
        id={props.type + "_" + props.property + "CountInput"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={value}
        onChange={handleChange}
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
