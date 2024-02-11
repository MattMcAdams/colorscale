import {
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
} from "js-easing-functions";

export const easingOptions = [
  'linear',
  'easeInQuad',
  'easeOutQuad',
  'easeInOutQuad',
  'easeInCubic',
  'easeOutCubic',
  'easeInOutCubic',
  'easeInQuart',
  'easeOutQuart',
  'easeInOutQuart',
  'easeInQuint',
  'easeOutQuint',
  'easeInOutQuint',
  'easeInSine',
  'easeOutSine',
  'easeInOutSine',
  'easeInExpo',
  'easeOutExpo',
  'easeInOutExpo',
  'easeInCirc',
  'easeOutCirc',
  'easeInOutCirc',
] as const;

export type easingOptionsType = typeof easingOptions[number];

export function ease(
  method: easingOptionsType,
  step: number,
  end: number,
  steps: number
) {
  switch (method) {
    case "easeInQuad":
      return easeInQuad(step, 0, end, steps);
    case "easeOutQuad":
      return easeOutQuad(step, 0, end, steps);
    case "easeInOutQuad":
      return easeInOutQuad(step, 0, end, steps);
    case "easeInCubic":
      return easeInCubic(step, 0, end, steps);
    case "easeOutCubic":
      return easeOutCubic(step, 0, end, steps);
    case "easeInOutCubic":
      return easeInOutCubic(step, 0, end, steps);
    case "easeInQuart":
      return easeInQuart(step, 0, end, steps);
    case "easeOutQuart":
      return easeOutQuart(step, 0, end, steps);
    case "easeInOutQuart":
      return easeInOutQuart(step, 0, end, steps);
    case "easeInQuint":
      return easeInQuint(step, 0, end, steps);
    case "easeOutQuint":
      return easeOutQuint(step, 0, end, steps);
    case "easeInOutQuint":
      return easeInOutQuint(step, 0, end, steps);
    case "easeInSine":
      return easeInSine(step, 0, end, steps);
    case "easeOutSine":
      return easeOutSine(step, 0, end, steps);
    case "easeInOutSine":
      return easeInOutSine(step, 0, end, steps);
    case "easeInExpo":
      return easeInExpo(step, 0, end, steps);
    case "easeOutExpo":
      return easeOutExpo(step, 0, end, steps);
    case "easeInOutExpo":
      return easeInOutExpo(step, 0, end, steps);
    case "easeInCirc":
      return easeInCirc(step, 0, end, steps);
    case "easeOutCirc":
      return easeOutCirc(step, 0, end, steps);
    case "easeInOutCirc":
      return easeInOutCirc(step, 0, end, steps);
  }
  return ((step) / steps) * end;
}
