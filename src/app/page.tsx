"use client";

import chroma from "chroma-js";

import { useSessionContext } from "../data/session";
import * as hex from "../functions/hex";
import { getColorsList } from "../functions/getColors";
import ColorInput from "../components/inputs/KeyColorInput";
import CountInput from "../components/inputs/CountInput";
import BrightnessInput from "../components/inputs/BrightnessInput";
import RotationInput from "../components/inputs/RotationInput";
import SaturationInput from "../components/inputs/SaturationInput";
import ColorRow from "../components/ColorRow";
import { ConnectedScatterplot } from "../components/Graph";

const getChroma = (hex: string) => {
  const [, c] = chroma(hex).lch();
  return c;
};

const getHue = (hex: string) => {
  return chroma(hex).hsl()[0];
}

export default function Home() {
  const Session = useSessionContext();

  const darkColors = getColorsList(
    Session.darkCount,
    "black",
    Session.darkRotation,
    Session.darkRotationEasing,
    Session.darkSaturation,
    Session.darkSaturationEasing,
    Session.darkness,
    Session.darknessEasing,
    Session.keyColor,
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
    Session.keyColor,
    '#FFFFFF'
  );

  const allColors = [...darkColors, hex.fromNumber(Session.keyColor), ...lightColors]

  return (
    <main className="space-y-16 p-16">
      <div id="primaryControls">
        <ColorInput />
      </div>
      <div id="colorScale">
        <ColorRow darkColors={darkColors} lightColors={lightColors} />
      </div>
      <div id="colorControls" className="flex space-x-8">
        <div className="space-y-12">
          <CountInput type="dark" />
          <BrightnessInput type="dark" />
          <RotationInput type="dark" />
          <SaturationInput type="dark" />
        </div>
        <div className="space-y-12">
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
              width={300}
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
              width={300}
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
              width={300}
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
      </div>
    </main>
  );
}
