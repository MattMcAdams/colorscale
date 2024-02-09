"use client";

import { useSessionContext } from "../data/session";
import { getColorsList } from "../data/utils";
import DarknessInput from "../components/DarknessInput";
import ColorInput from "../components/ColorInput";
import DarkCountInput from "../components/DarkCountInput";
import ColorRow from "../components/ColorRow";


export default function Home() {
  const Session = useSessionContext();

  const darkColors = getColorsList(
    Session.darkCount,
    "black",
    Session.darkness,
    Session.keyColor
  ).reverse();

  return (
      <main className="space-y-16 p-16">
        <div id="primaryControls">
          <ColorInput />
        </div>
        <div id="colorScale">
          <ColorRow darkColors={darkColors} />
        </div>
        <div id="colorControls" className="flex space-x-8">
          <div>
            <DarkCountInput />
            <DarknessInput />
          </div>
        </div>
      </main>
  );
}
