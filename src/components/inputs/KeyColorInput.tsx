"use client";

import { ChangeEvent } from "react";
import { useSessionContext } from "../../data/session";
import * as hex from "../../functions/hex";

const KeyColorInput = () => {
  const Session = useSessionContext();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.toUpperCase();
    Session.updateKeyColor(value);
  }

  return (
    <div id="colorInput" className="w-80">
      <label
        htmlFor="colorInput"
        className="block font-mono font-bold text-base"
      >
        Color
      </label>
      <div className="flex space-x-2">
        <div className="font-mono text-3xl font-light text-gray-400 mr-">#</div>
        <input
          className="w-full font-mono text-3xl font-light text-gray-700"
          type="text"
          id="colorInput"
          value={Session.config.keyColor}
          onChange={handleChange}
        />
      </div>
      {hex.isValid(hex.fromNumber(Session.config.keyColor)) ? (
        <p>&nbsp;</p>
      ) : (
        <p>Invalid color code</p>
      )}
    </div>
  );
};

export default KeyColorInput;
