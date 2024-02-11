"use client";

import chroma from "chroma-js";
import * as hex from "../functions/hex";

const AdvancedColorInfo = (props: { hexString: string }) => {
  const hexCode = hex.fromNumber(props.hexString);
  const rgbCode = hex.toRGB(hexCode);
  const hslCode = hex.toHSL(hexCode);

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
  }

  function contrast(
    hex1: string,
    hex2: string
  ) {
    const lum1 = chroma(hex1).luminance();
    const lum2 = chroma(hex2).luminance();
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return Math.floor(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100;
  }

  const whiteContrast = contrast('#FFFFFF', hexCode);
  const blackContrast = contrast('#000000', hexCode);

  function accessibilityCheck(contrast: number, large: boolean) {
    if (contrast >= 4.5 && large) {
      return 'AAA';
    } else if (contrast >= 3 && large) {
      return 'AA';
    } else if (large) {
      return 'FAIL';
    }
    if (contrast >= 7) {
      return 'AAA';
    } else if (contrast >= 4.5) {
      return 'AA';
    }
    return 'FAIL';
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
        </div>
        <div>
          <h2>Accessibility</h2>
          <div>
            <p className="block mt-4 mb-2 text-sm font-bold text-gray-900 font-mono">
              White Contrast{" "}
              <strong className="font-bold">({whiteContrast})</strong>
            </p>
            <p className="text-sm">
              Text: {accessibilityCheck(whiteContrast, false)}
            </p>
            <p className="text-sm">
              Headlines: {accessibilityCheck(whiteContrast, true)}
            </p>
          </div>
          <div>
            <p className="block mt-4 mb-2 text-sm font-bold text-gray-900 font-mono">
              Black Contrast{" "}
              <strong className="font-bold">({blackContrast})</strong>
            </p>
            <p className="text-sm">
              Text: {accessibilityCheck(blackContrast, false)}
            </p>
            <p className="text-sm">
              Headlines: {accessibilityCheck(blackContrast, true)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedColorInfo;
