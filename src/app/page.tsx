"use client";

// Load dependencies
import Color from 'color';
import { useRouter } from "next/navigation";
import { useState } from "react";
// load types
import easingOptions from "../types/easing";
// load functions
import * as hex from "../functions/hex";
import getColorsList from "../functions/getColors";
import getSvg from "../functions/getSvg";
// load data
import { useSessionContext } from "../data/session";
import limits from "../data/limits";
// load inputs
import Button from "../components/inputs/Button";
import NumberInput from "../components/inputs/NumberInput";
import EasingInput from "../components/inputs/EasingInput";
import TextInput from "../components/inputs/TextInput";
import ColorInput from "../components/inputs/KeyColorInput";
import AdvColorInfoInput from "../components/inputs/AdvColorInfoInput";

// load components
import ColorRow from "../components/ColorRow";
import { ConnectedScatterplot } from "../components/Graph";

export default function Home() {
  const Session = useSessionContext();
  const router = useRouter();

  const [configString, setConfigString] = useState(
    typeof localStorage !== 'undefined' ? localStorage.getItem("colorToolConfig") || "" : ""
  );

  const mainColor = hex.isValid(hex.fromNumber(Session.config.keyColor)) ? hex.fromNumber(Session.config.keyColor) : "#000000";

  const darkColors = getColorsList(
    Session.config.dark.count,
    "black",
    Session.config.dark.angle,
    Session.config.dark.angleEase,
    Session.config.dark.saturation,
    Session.config.dark.saturationEase,
    Session.config.dark.brightness,
    Session.config.dark.brightnessEase,
    mainColor,
    '#FFFFFF'
  ).reverse();

  const lightColors = getColorsList(
    Session.config.light.count,
    'white',
    Session.config.light.angle,
    Session.config.light.angleEase,
    Session.config.light.saturation,
    Session.config.light.saturationEase,
    Session.config.light.brightness,
    Session.config.light.brightnessEase,
    mainColor,
    '#FFFFFF'
  );

  const allColors = [...darkColors, mainColor, ...lightColors];

  function saveAs() {
    const name = prompt("What would you like to name this configuration?");
    if (name) {
      Session.saveToLibrary(Session.config, name, true);
    }
  };

  function save() {
    Session.saveToLibrary(Session.config);
  }

  function applyConfig() {
    Session.loadConfig(configString);
  }

  function loadConfig() {
    setConfigString(localStorage.getItem("colorToolConfig") || "");
  }

  function copyToClipboard(content: string) {
    navigator.clipboard.writeText(content);
  }

  return (
    <main className="space-y-16 lg:p-16 md:p-8 p-4">
      {Session.providerLoaded ? (
        Session.configLoaded ? (
          <>
            <div id="primaryControls" className="flex flex-wrap gap-8">
              <div>
                <ColorInput />
                <p className="mt-2">Colorful v2.1.0</p>
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
                    href="https://mattmcadams.com/donate"
                  >
                    Donate
                  </a>
                </p>
              </div>
              <div className="flex flex-wrap gap-8">
                <div className="space-y-4 w-80">
                  <p className="block font-mono font-bold text-base">Manage</p>
                  <Button
                    onClick={() => router.push("/library")}
                    className="w-full mt-4"
                  >
                    Library
                  </Button>
                  <div className="flex gap-4">
                    {Session.configDirty && Session.config.id ? (
                      <>
                        <Button onClick={save} className="basis-1/2">
                          Save
                        </Button>
                        <Button onClick={saveAs} className="basis-1/2">
                          Save As
                        </Button>
                      </>
                    ) : (
                      <Button onClick={saveAs} className="grow">
                        Save As
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="block font-mono font-bold text-base">Options</p>
                  <AdvColorInfoInput />
                  <div className="flex gap-4">
                    <Button
                      className="basis-1/2"
                      onClick={() => copyToClipboard(allColors.join(", "))}
                    >
                      Copy Colors
                    </Button>
                    <Button
                      className="basis-1/2"
                      onClick={() => copyToClipboard(getSvg(allColors))}
                    >
                      Copy SVG
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="colorScale"
              className="sticky top-0 pt-8 pb-3 bg-white border-b border-gray-300"
            >
              <ColorRow config={Session.config} />
            </div>
            <div id="colorControls" className="flex flex-wrap gap-x-8 gap-y-12">
              <div className="space-y-12 w-80">
                <NumberInput
                  name="darkCount"
                  label="Dark Count"
                  min={limits.count.min}
                  max={limits.count.max}
                  slider={false}
                  value={Session.config.dark.count}
                  changeHandler={(e) =>
                    Session.updateConfig(
                      "dark",
                      "count",
                      Number(e.target.value)
                    )
                  }
                />
                <div>
                  <NumberInput
                    name="darkness"
                    label="Darkness"
                    min={limits.brightness.min}
                    max={limits.brightness.max}
                    slider={true}
                    value={Session.config.dark.brightness}
                    changeHandler={(e) =>
                      Session.updateConfig(
                        "dark",
                        "brightness",
                        Number(e.target.value)
                      )
                    }
                  />
                  <EasingInput
                    name="darknessEase"
                    label="Darkness Easing"
                    value={Session.config.dark.brightnessEase}
                    changeHandler={(e) =>
                      Session.updateConfigEasing(
                        "dark",
                        "brightness",
                        e.target.value as easingOptions
                      )
                    }
                  />
                </div>
                <div>
                  <NumberInput
                    name="darkAngle"
                    label="Dark color hue shift"
                    min={limits.angle.min}
                    max={limits.angle.max}
                    slider={true}
                    value={Session.config.dark.angle}
                    changeHandler={(e) =>
                      Session.updateConfig(
                        "dark",
                        "angle",
                        Number(e.target.value)
                      )
                    }
                  />
                  <EasingInput
                    name="darkAngleEase"
                    label="Dark color hue shift easing"
                    value={Session.config.dark.angleEase}
                    changeHandler={(e) =>
                      Session.updateConfigEasing(
                        "dark",
                        "angle",
                        e.target.value as easingOptions
                      )
                    }
                  />
                </div>
                <div>
                  <NumberInput
                    name="darkSaturation"
                    label="Dark color saturation"
                    min={limits.saturation.min}
                    max={limits.saturation.max}
                    slider={true}
                    value={Session.config.dark.saturation}
                    changeHandler={(e) =>
                      Session.updateConfig(
                        "dark",
                        "saturation",
                        Number(e.target.value)
                      )
                    }
                  />
                  <EasingInput
                    name="darkSaturationEase"
                    label="Dark saturation easing"
                    value={Session.config.dark.saturationEase}
                    changeHandler={(e) =>
                      Session.updateConfigEasing(
                        "dark",
                        "saturation",
                        e.target.value as easingOptions
                      )
                    }
                  />
                </div>
              </div>
              <div className="space-y-12 w-80">
                <NumberInput
                  name="lightCount"
                  label="Light Count"
                  min={limits.count.min}
                  max={limits.count.max}
                  slider={false}
                  value={Session.config.light.count}
                  changeHandler={(e) =>
                    Session.updateConfig(
                      "light",
                      "count",
                      Number(e.target.value)
                    )
                  }
                />
                <div>
                  <NumberInput
                    name="lightness"
                    label="Lightness"
                    min={limits.brightness.min}
                    max={limits.brightness.max}
                    slider={true}
                    value={Session.config.light.brightness}
                    changeHandler={(e) =>
                      Session.updateConfig(
                        "light",
                        "brightness",
                        Number(e.target.value)
                      )
                    }
                  />
                  <EasingInput
                    name="lightnessEase"
                    label="Lightness Easing"
                    value={Session.config.light.brightnessEase}
                    changeHandler={(e) =>
                      Session.updateConfigEasing(
                        "light",
                        "brightness",
                        e.target.value as easingOptions
                      )
                    }
                  />
                </div>
                <div>
                  <NumberInput
                    name="lightAngle"
                    label="Light color hue shift"
                    min={limits.angle.min}
                    max={limits.angle.max}
                    slider={true}
                    value={Session.config.light.angle}
                    changeHandler={(e) =>
                      Session.updateConfig(
                        "light",
                        "angle",
                        Number(e.target.value)
                      )
                    }
                  />
                  <EasingInput
                    name="lightAngleEase"
                    label="Light color hue shift easing"
                    value={Session.config.light.angleEase}
                    changeHandler={(e) =>
                      Session.updateConfigEasing(
                        "light",
                        "angle",
                        e.target.value as easingOptions
                      )
                    }
                  />
                </div>
                <div>
                  <NumberInput
                    name="lightSaturation"
                    label="Light color saturation"
                    min={limits.saturation.min}
                    max={limits.saturation.max}
                    slider={true}
                    value={Session.config.light.saturation}
                    changeHandler={(e) =>
                      Session.updateConfig(
                        "light",
                        "saturation",
                        Number(e.target.value)
                      )
                    }
                  />
                  <EasingInput
                    name="lightSaturationEase"
                    label="Light saturation easing"
                    value={Session.config.light.saturationEase}
                    changeHandler={(e) =>
                      Session.updateConfigEasing(
                        "light",
                        "saturation",
                        e.target.value as easingOptions
                      )
                    }
                  />
                </div>
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
                      y: Color(s).luminosity(),
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
                      y: Color(s).lch().object().c,
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
                      y: Color(s).hsl().object().h,
                      hex: s,
                    }))}
                  />
                </figure>
              </div>
              <div className="space-y-12 w-80">
                <TextInput
                  name="name"
                  label="Name"
                  value={Session.config.name ? Session.config.name : ""}
                  changeHandler={(e) => Session.updateName(e.target.value)}
                />
                <div className="space-y-2">
                  <TextInput
                    area={true}
                    name="config"
                    label="Configuration"
                    value={configString}
                    changeHandler={(e) => setConfigString(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={applyConfig} className="grow">
                      Apply Config
                    </Button>
                    <Button onClick={loadConfig} className="grow">
                      Get Current
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <p>Loading Configuration</p>
          </>
        )
      ) : (
        <p>The context provider has failed to load</p>
      )}
    </main>
  );
}
