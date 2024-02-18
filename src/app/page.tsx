"use client";

// Load dependencies
import Color from 'color';
// load types
import easingOptions from "../types/easing";
// load functions
import * as hex from "../functions/hex";
import getColorsList from "../functions/getColors";
// load data
import { useSessionContext } from "../data/session";
import limits from "../data/limits";
// load inputs
import NumberInput from "../components/inputs/NumberInput";
import EasingInput from "../components/inputs/EasingInput";
import ColorInput from "../components/inputs/KeyColorInput";
import AdvColorInfoInput from "../components/inputs/AdvColorInfoInput";
import CopyColorsButton from "../components/inputs/CopyColorsButton";
import CopySvgButton from "../components/inputs/CopySvgButton";
import ConfigInput from "../components/inputs/Configuration";
// load components
import ColorRow from "../components/ColorRow";
import { ConnectedScatterplot } from "../components/Graph";

export default function Home() {
  const Session = useSessionContext();

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

  const allColors = [...darkColors, mainColor, ...lightColors]

  return (
    <main className="space-y-16 lg:p-16 md:p-8 p-4">
      {Session.providerLoaded ? (
        Session.configLoaded ? (
          <>
            <div id="primaryControls" className="flex flex-wrap gap-x-8 gap-y-8">
              <div className='space-y-7'>
                <ColorInput />
                <a
                  href="/library"
                  className="block text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 transform active:scale-90 transition-transform py-2.5"
                >
                  Library
                </a>
              </div>
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
                <p className="mt-4">Colorful v2.0.0</p>
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
            </div>
            <div
              id="colorScale"
              className="sticky top-0 pt-8 pb-3 overflow-x-auto bg-white border-b border-gray-300"
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
              <div>
                <ConfigInput />
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
