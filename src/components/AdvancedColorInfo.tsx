"use client";

import Color from 'color';
import * as hex from "../functions/hex";

const AdvancedColorInfo = (props: { hexString: string }) => {
  const hexCode = hex.fromNumber(props.hexString);
  const rgbCode = Color(hexCode).rgb().string();
  const hslCode = Color(hexCode).hsl().string();
  const lchCode = Color(hexCode).lch().string();

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
  }

  //to round to n decimal places
  function round(num: number, places: number) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
  }

  function accessibilityCheck(hex1: string, hex2: string, large: boolean) {
    if (Color(hex1).contrast(Color(hex2)) >= 4.5 && large) {
      return "AAA";
    } else if (Color(hex1).contrast(Color(hex2)) >= 3 && large) {
      return "AA";
    } else if (large) {
      return "FAIL";
    }
    if (Color(hex1).contrast(Color(hex2)) >= 7) {
      return "AAA";
    } else if (Color(hex1).contrast(Color(hex2)) >= 4.5) {
      return "AA";
    }
    return "FAIL";
  }

  return (
    <div className="p-4 md:p-5 space-y-4">
      <div className="largeSwatch" style={{ background: hexCode }}></div>
      <div className="flex flex-wrap gap-y-4 gap-x-4">
        <div>
          <h2>Formats</h2>
          <p className="block mt-4 text-sm font-bold text-gray-900 font-mono">
            Hex
          </p>
          <code
            className="block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg range-sm transform active:scale-95 transition-transform"
            onClick={() => copyToClipboard(hexCode)}
          >
            {hexCode}
          </code>
          <p className="block mt-4 text-sm font-bold text-gray-900 font-mono">
            RGB
          </p>
          <code
            className="block w-full p-2 bg-gray-50 border border-gray-300rounded-lg range-sm transform active:scale-95 transition-transform"
            onClick={() => copyToClipboard(rgbCode)}
          >
            {rgbCode}
          </code>
          <p className="block text-sm mt-4 font-bold text-gray-900 font-mono">
            HSL
          </p>
          <code
            className="block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg range-sm transform active:scale-95 transition-transform"
            onClick={() => copyToClipboard(hslCode)}
          >
            {hslCode}
          </code>
          <p className="block text-sm mt-4 font-bold text-gray-900 font-mono">
            LCH
          </p>
          <code
            className="block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg range-sm transform active:scale-95 transition-transform"
            onClick={() => copyToClipboard(hslCode)}
          >
            {lchCode}
          </code>
        </div>
        <div>
          <h2>Accessibility</h2>
          <div>
            <p className="block mt-4 mb-2 text-sm font-bold text-gray-900 font-mono">
              White Contrast{" "}
              <strong className="font-bold">
                ({round(Color(hexCode).contrast(Color("#ffffff")), 2)})
              </strong>
            </p>
            <p className="text-sm">
              Text: {accessibilityCheck(hexCode, "#ffffff", false)}
            </p>
            <p className="text-sm">
              Headlines: {accessibilityCheck(hexCode, "#ffffff", true)}
            </p>
          </div>
          <div>
            <p className="block mt-4 mb-2 text-sm font-bold text-gray-900 font-mono">
              Black Contrast{" "}
              <strong className="font-bold">
                ({round(Color(hexCode).contrast(Color("#000000")), 2)})
              </strong>
            </p>
            <p className="text-sm">
              Text: {accessibilityCheck(hexCode, "#000000", false)}
            </p>
            <p className="text-sm">
              Headlines: {accessibilityCheck(hexCode, "#000000", true)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedColorInfo;
