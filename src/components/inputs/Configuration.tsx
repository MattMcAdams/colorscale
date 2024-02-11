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
          className="grow text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transform active:scale-90 transition-transform"
          onClick={applyConfig}
        >
          Apply Config
        </button>
        <button
          className="grow text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transform active:scale-90 transition-transform"
          onClick={loadConfig}
        >
          Get Current
        </button>
      </div>
    </div>
  );
};

export default ConfigInput;
