import { easingOptions } from './easing';

export type config = {
  id?: string,
  name?: string,
  keyColor: string,
  dark: {
    count: number,
    brightness: number,
    brightnessEase: easingOptions,
    angle: number,
    angleEase: easingOptions,
    saturation: number,
    saturationEase: easingOptions,
  },
  light: {
    count: number,
    brightness: number,
    brightnessEase: easingOptions,
    angle: number,
    angleEase: easingOptions,
    saturation: number,
    saturationEase: easingOptions,
  },
};

export default config;
