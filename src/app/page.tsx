"use client";

import chroma from "chroma-js";

import { useSessionContext } from "../data/session";
import * as hex from "../functions/hex";
import { getColorsList } from "../functions/getColors";
import ColorInput from "../components/inputs/KeyColorInput";
import AdvColorInfoInput from "../components/inputs/AdvColorInfoInput";
import CountInput from "../components/inputs/CountInput";
import BrightnessInput from "../components/inputs/BrightnessInput";
import RotationInput from "../components/inputs/RotationInput";
import SaturationInput from "../components/inputs/SaturationInput";
import ConfigInput from "../components/inputs/Configuration";
import ColorRow from "../components/ColorRow";
import { ConnectedScatterplot } from "../components/Graph";
import CopyColorsButton from "../components/inputs/CopyColorsButton";
import CopySvgButton from "../components/inputs/CopySvgButton";

const getChroma = (hex: string) => {
  const [, c] = chroma(hex).lch();
  return c;
};

const getHue = (hex: string) => {
  return chroma(hex).hsl()[0];
}

export default function Home() {
  const Session = useSessionContext();

  const mainColor = hex.isValid(hex.fromNumber(Session.keyColor)) ? hex.fromNumber(Session.keyColor) : "#000000";

  const darkColors = getColorsList(
    Session.darkCount,
    "black",
    Session.darkRotation,
    Session.darkRotationEasing,
    Session.darkSaturation,
    Session.darkSaturationEasing,
    Session.darkness,
    Session.darknessEasing,
    mainColor,
    '#FFFFFF'
  ).reverse();

  const lightColors = getColorsList(
    Session.lightCount,
    'white',
    Session.lightRotation,
    Session.lightRotationEasing,
    Session.lightSaturation,
    Session.lightSaturationEasing,
    Session.lightness,
    Session.lightnessEasing,
    mainColor,
    '#FFFFFF'
  );

  const allColors = [...darkColors, mainColor, ...lightColors]

  return (
    <main className="space-y-16 p-16">
      {Session.loaded ? (
        <>
          <div id="primaryControls" className="flex flex-wrap gap-x-8">
            <ColorInput />
            <div className="space-y-4">
              <p className="block font-mono font-bold text-base">Options</p>
              <AdvColorInfoInput />
              <div className="flex gap-x-4">
                <CopyColorsButton colors={allColors} />
                <CopySvgButton colors={allColors} />
              </div>
            </div>
            <div>
              <span className="block font-mono font-bold text-base">
                About
              </span>
              <p className="mt-4">Colorful v1.0</p>
              <p>
                <a
                  href="https://www.mattmcadams.com"
                  className="underline"
                  target="_blank"
                >
                  Matt McAdams
                </a>{" "}
                &middot;{" "}
                <a
                  href="https://github.com/MattMcAdams/color-tool"
                  target="_blank"
                  className="underline"
                >
                  Open Source
                </a>{" "}
                &middot;{" "}
                <a
                  className="underline"
                  target="_blank"
                  href="https://ko-fi.com/mattmcadams"
                >
                  Donate
                </a>
              </p>
            </div>
          </div>
          <div id="colorScale">
            <ColorRow
              darkColors={darkColors}
              mainColor={mainColor}
              lightColors={lightColors}
            />
          </div>
          <div id="colorControls" className="flex flex-wrap gap-x-8 gap-y-12">
            <div className="space-y-12 w-80">
              <CountInput type="dark" />
              <BrightnessInput type="dark" />
              <RotationInput type="dark" />
              <SaturationInput type="dark" />
            </div>
            <div className="space-y-12 w-80">
              <CountInput type="light" />
              <BrightnessInput type="light" />
              <RotationInput type="light" />
              <SaturationInput type="light" />
            </div>
            <div className="space-y-12">
              <figure>
                <figcaption className="block mb-2 text-sm font-bold text-gray-900 font-mono">
                  Luminance · How bright is it?
                </figcaption>
                <ConnectedScatterplot
                  width={320}
                  height={150}
                  yDomain={[0, 1]}
                  data={allColors.map((s) => ({
                    x: allColors.indexOf(s),
                    y: chroma(s).luminance(),
                    hex: s,
                  }))}
                />
              </figure>
              <figure>
                <figcaption className="block mb-2 text-sm font-bold text-gray-900 font-mono">
                  Chroma · How colorful is it?
                </figcaption>
                <ConnectedScatterplot
                  width={320}
                  height={150}
                  yDomain={[0, 150]}
                  data={allColors.map((s) => ({
                    x: allColors.indexOf(s),
                    y: getChroma(s),
                    hex: s,
                  }))}
                />
              </figure>
              <figure>
                <figcaption className="block mb-2 text-sm font-bold text-gray-900 font-mono">
                  Hue · What color is it?
                </figcaption>
                <ConnectedScatterplot
                  width={320}
                  height={150}
                  yDomain={[0, 360]}
                  data={allColors.map((s) => ({
                    x: allColors.indexOf(s),
                    y: getHue(s),
                    hex: s,
                  }))}
                />
              </figure>
            </div>
            <div>
              <ConfigInput />
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Loading Configuration</p>
        </>
      )}
    </main>
  );
}
