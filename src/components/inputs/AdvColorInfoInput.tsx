"use client";

import { useSessionContext } from "../../data/session";

const AdvColorInfoInput = () => {
  const Session = useSessionContext();

  return (
    <div id={"AdvColorInfoInputField"} className="space-y-2 w-80">
      <div className="flex items-center ps-4 border border-gray-300 rounded-lg">
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
          className="w-full py-2.5 ms-2 text-sm font-medium text-gray-900"
        >
          Show Advanced Color Information
        </label>
      </div>
    </div>
  );
};

export default AdvColorInfoInput;
