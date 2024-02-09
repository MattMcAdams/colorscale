"use client";

import { numberToHex } from "../data/utils";

const Swatch = (props: { hex: string; primary?: boolean }) => {
  const primary = props.primary ? " primary" : "";
  const value = numberToHex(props.hex);

  function copyToClipboard() {
    navigator.clipboard.writeText(value);
  }

  return (
    <div className={"swatch" + primary}>
      <div
        style={{ background: value }}
        data-hex={value}
        onClick={copyToClipboard}
      ></div>
      <p>{value}</p>
    </div>
  );
};

export default Swatch;
