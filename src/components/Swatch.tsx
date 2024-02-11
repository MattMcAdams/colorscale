"use client";

import { useState } from "react";
import { useSessionContext } from "../data/session";
import Modal from "./Modal";
import * as hex from "../functions/hex";
import AdvancedColorInfo from "./AdvancedColorInfo";

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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <AdvancedColorInfo hexString={props.hex} />
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
