"use client";

import { ChangeEvent } from "react";
import { useSessionContext } from "../../data/session";

const DarkCountInput = (props: {type: 'light' | 'dark'}) => {
  const Session = useSessionContext();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    Session.updateCount(props.type, value);
  }

  return (
    <div id={props.type + "CountInputField"} className="space-y-2">
      <label
        htmlFor={props.type + "CountInput"}
        className="block mb-2 text-sm font-bold text-gray-900 font-mono"
      >
        {props.type === 'light' ? 'Light' : 'Dark'} color steps
      </label>
      <input
        className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
        type="number"
        max="10"
        min="0"
        id={props.type + "CountInput"}
        value={props.type === 'light' ? Session.lightCount : Session.darkCount}
        onChange={handleChange}
      />
    </div>
  );
};

export default DarkCountInput;
