"use client";

import * as hex from "../functions/hex";

const Swatch = (props: { hex: string; primary?: boolean }) => {
  const primary = props.primary ? " primary" : "";
  const value = hex.fromNumber(props.hex);

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
      <p className="font-mono">{value}</p>
    </div>
  );
};

export default Swatch;
