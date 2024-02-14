"use client";

import { useSessionContext } from "../../data/session";

const SmoothingInput = () => {
  const Session = useSessionContext();

  return (
    <div id={"SmoothingInputField"} className="space-y-2 w-80">
      <div className="flex items-center ps-4 border border-gray-300 rounded">
        <input
          id="SmoothingInput"
          type="checkbox"
          checked={Session.smoothing}
          name="adv-color-info"
          onChange={(e) => Session.updateSmoothing(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
        />
        <label
          htmlFor="SmoothingInput"
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
        >
          Apply Artificial Smoothing
        </label>
      </div>
    </div>
  );
};

export default SmoothingInput;
