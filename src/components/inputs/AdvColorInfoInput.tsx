"use client";

import { ChangeEvent } from "react";
import { useSessionContext } from "../../data/session";
import EasingInput from "./EasingInput";

const AdvColorInfoInput = () => {
  const Session = useSessionContext();

  return (
    <div id={"AdvColorInfoInputField"} className="space-y-2 w-80">
      <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
        <input
          id="advColorInfoInput"
          type="checkbox"
          checked={Session.advColorInfo}
          name="adv-color-info"
          onChange={(e) => Session.updateAdvColorInfo(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
        />
        <label
          htmlFor="advColorInfoInput"
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
        >
          Show Advanced Color Information
        </label>
      </div>
    </div>
  );
};

export default AdvColorInfoInput;
