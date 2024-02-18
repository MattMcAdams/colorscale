import { easingOptions } from "./easing";
import type { config } from "./configObj";

export type context = {
  providerLoaded: boolean;
  libraryLoaded: boolean;
  loadLibrary: (libraryString: string) => void;

  configLoaded: boolean;
  loadConfig: (configString: string) => void;

  advColorInfo: boolean;
  updateAdvColorInfo: (value: boolean) => void;

  config: config;
  updateKeyColor: (hex: string) => void;
  updateConfig: (
    key: 'light' | 'dark',
    property: 'brightness' | 'saturation' | 'angle' | 'count',
    value: number
  ) => void;
  updateConfigEasing: (
    key: 'light' | 'dark',
    property: 'brightness' | 'saturation' | 'angle',
    easing: easingOptions
  ) => void;

  library: config[];
  saveToLibrary: (config: config) => void;
  deleteFromLibrary: (config: config) => void;
};
