"use client";

import { ChangeEvent, useState } from "react";
import { useSessionContext } from "../../data/session";

const ConfigInput = () => {
  const Session = useSessionContext();

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    let value = e.target.value;
    Session.updateConfigString(value);
    localStorage.setItem("colorToolConfig", JSON.stringify(value, undefined, 4));
    Session.load(false);
  }

  return (
    <div id={"CongifInputField"} className="space-y-2 w-80">
      <label
        htmlFor={"ConfigInput"}
        className="block mb-2 text-sm font-bold text-gray-900 font-mono"
      >
        RAW Configuration
      </label>
      <textarea
        className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
        id={"ConfigInput"}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        style={{ height: "38rem" }}
        value={Session.configString}
        onChange={handleChange}
      />
    </div>
  );
};

export default ConfigInput;
