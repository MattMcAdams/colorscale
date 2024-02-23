import { easingOptions } from "./easing";
import type { config } from "./config";
import type { library } from "./library";

export type context = {
  providerLoaded: boolean;
  libraryLoaded: boolean;
  loadLibrary: (libraryString: string) => void;

  configLoaded: boolean;
  loadConfig: (configString: string) => void;

  advColorInfo: boolean;
  updateAdvColorInfo: (value: boolean) => void;

  config: config;
  configDirty: boolean;
  updateKeyColor: (hex: string) => void;
  updateName: (newName: string) => void;
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

  library: library;
  saveToLibrary: (config: config, name?: string, saveAs?: boolean) => void;
  deleteFromLibrary: (config: config) => void;
};
