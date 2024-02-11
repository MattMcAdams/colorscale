"use client";

import { ChangeEvent, useState } from "react";
import { useSessionContext } from "../../data/session";

const ConfigInput = () => {
  const Session = useSessionContext();
  const [configString, setConfigString] = useState(
    localStorage.getItem("colorToolConfig") || ''
  );

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    let value = e.target.value;
    setConfigString(value);
  }

  function applyConfig() {
    Session.loadConfiguration(configString);
    setConfigString(localStorage.getItem("colorToolConfig") || "");
  }

  function loadConfig() {
    setConfigString(localStorage.getItem("colorToolConfig") || '');
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
        style={{ height: "35rem" }}
        value={configString}
        onChange={handleChange}
      />
      <div className="flex space-x-2">
        <button
          className="rounded-lg bg-blue-500 text-white font-bold text-sm border-blue-500 p-2.5"
          onClick={applyConfig}
        >
          Apply Configuration
        </button>
        <button
          className="rounded-lg bg-blue-500 text-white font-bold text-sm border-blue-500 p-2.5"
          onClick={loadConfig}
        >
          Load Configuration
        </button>
      </div>
    </div>
  );
};

export default ConfigInput;
