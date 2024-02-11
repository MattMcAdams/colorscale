"use client";

import { useState } from "react";
import { useSessionContext } from "../data/session";
import Modal from "./Modal";
import * as hex from "../functions/hex";

const Swatch = (props: { hex: string; primary?: boolean }) => {
  const Session = useSessionContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const primary = props.primary ? " primary" : "";
  const copyEnabled = Session.advColorInfo ? "" : " copy-enabled";
  const value = hex.fromNumber(props.hex);

  function copyToClipboard(whatever: string) {
    navigator.clipboard.writeText(whatever);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function colorInfo() {
    if (Session.advColorInfo) {
      setIsModalOpen(true);
    } else {
      copyToClipboard(value);
    }
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* <!-- Modal content --> */}
        <div className="relative">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900">
              Advanced Color Information
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-4 md:p-5 space-y-4">
            <div className="largeSwatch" style={{ background: value }}></div>
            <div className="flex flex-wrap gap-y-4 gap-x-4">
              <div>
                <p className="block text-sm font-bold text-gray-900 font-mono">
                  Hex
                </p>
                <code
                  className="block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg range-sm transform active:scale-95 transition-transform"
                  onClick={() => copyToClipboard(value)}
                >
                  {value}
                </code>
                <p className="block mt-4 text-sm font-bold text-gray-900 font-mono">
                  RGB
                </p>
                <code
                  className="block w-full p-2 bg-gray-50 border border-gray-300rounded-lg range-sm transform active:scale-95 transition-transform"
                  onClick={() => copyToClipboard(hex.toRGB(value))}
                >
                  {hex.toRGB(value)}
                </code>
                <p className="block text-sm mt-4 font-bold text-gray-900 font-mono">
                  HSL
                </p>
                <code
                  className="block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg range-sm transform active:scale-95 transition-transform"
                  onClick={() => copyToClipboard(hex.toHSL(value))}
                >
                  {hex.toHSL(value)}
                </code>
              </div>
              <div>
                <p>Accessibility Info Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className={"swatch" + primary}>
        <div
          style={{ background: value }}
          className={copyEnabled}
          data-hex={value}
          onClick={colorInfo}
        ></div>
        <p className="font-mono tooltip">{value}</p>
      </div>
    </>
  );
};

export default Swatch;
