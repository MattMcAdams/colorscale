import { createContext, useContext, useState, useEffect } from "react";
import type { easingOptionsType } from "../functions/ease";

interface Props {
  children: React.ReactNode;
}

const defaults = {
  loaded: false,
  keyColor: "1D9A6C",
  darkCount: 4,
  lightCount: 5,
  darkness: 50,
  darknessEasing: "linear" as easingOptionsType,
  lightness: 80,
  lightnessEasing: "linear" as easingOptionsType,
  darkRotation: -50,
  darkRotationEasing: "linear" as easingOptionsType,
  lightRotation: 60,
  lightRotationEasing: "linear" as easingOptionsType,
  darkSaturation: 15,
  darkSaturationEasing: "linear" as easingOptionsType,
  lightSaturation: 20,
  lightSaturationEasing: "linear" as easingOptionsType,

  nullProvider: () =>
    console.error("Context Provider for the Session is not loaded"),
};

type contextType = {
  loaded: boolean;
  keyColor: string;
  darkCount: number;
  lightCount: number;
  darkness: number;
  darknessEasing: easingOptionsType;
  lightness: number;
  lightnessEasing: easingOptionsType;
  darkRotation: number;
  darkRotationEasing: easingOptionsType;
  lightRotation: number;
  lightRotationEasing: easingOptionsType;
  darkSaturation: number;
  darkSaturationEasing: easingOptionsType;
  lightSaturation: number;
  lightSaturationEasing: easingOptionsType;

  updateKeyColor: (hex: string) => void;
  updateCount: (type: "light" | "dark", count: number) => void;
  updateBrightness: (type: "light" | "dark", value: number) => void;
  updateRotation: (type: "light" | "dark", value: number) => void;
  updateSaturation: (type: "light" | "dark", value: number) => void;
  updateEasing: (type: "light" | "dark", property: "brightness" | "saturation" | "hue", easing: easingOptionsType) => void;
};

const Context = createContext<contextType>({
  loaded: defaults.loaded,
  keyColor: defaults.keyColor,
  darkCount: defaults.darkCount,
  lightCount: defaults.lightCount,
  darkness: defaults.darkness,
  darknessEasing: defaults.darknessEasing,
  lightness: defaults.lightness,
  lightnessEasing: defaults.lightnessEasing,
  darkRotation: defaults.darkRotation,
  darkRotationEasing: defaults.darkRotationEasing,
  lightRotation: defaults.lightRotation,
  lightRotationEasing: defaults.lightRotationEasing,
  darkSaturation: defaults.darkSaturation,
  darkSaturationEasing: defaults.darkSaturationEasing,
  lightSaturation: defaults.lightSaturation,
  lightSaturationEasing: defaults.lightSaturationEasing,

  updateKeyColor: defaults.nullProvider,
  updateCount: defaults.nullProvider,
  updateBrightness: defaults.nullProvider,
  updateRotation: defaults.nullProvider,
  updateSaturation: defaults.nullProvider,
  updateEasing: defaults.nullProvider,
});

const Provider: React.FC<Props> = ({ children }) => {
  const [keyColor, setKeyColor] = useState<string>(defaults.keyColor);
  const [darkCount, setDarkCount] = useState<number>(defaults.darkCount);
  const [lightCount, setLightCount] = useState<number>(defaults.lightCount);
  const [darkness, setDarkness] = useState<number>(defaults.darkness);
  const [darknessEasing, setDarknessEasing] = useState<easingOptionsType>(defaults.darknessEasing);
  const [lightness, setLightness] = useState<number>(defaults.lightness);
  const [lightnessEasing, setLightnessEasing] = useState<easingOptionsType>(defaults.lightnessEasing);
  const [darkRotation, setDarkRotation] = useState<number>(defaults.darkRotation);
  const [darkRotationEasing, setDarkRotationEasing] = useState<easingOptionsType>(defaults.darkRotationEasing);
  const [lightRotation, setLightRotation] = useState<number>(defaults.lightRotation);
  const [lightRotationEasing, setLightRotationEasing] = useState<easingOptionsType>(defaults.lightRotationEasing);
  const [darkSaturation, setDarkSaturation] = useState<number>(defaults.darkSaturation);
  const [darkSaturationEasing, setDarkSaturationEasing] = useState<easingOptionsType>(defaults.darkSaturationEasing);
  const [lightSaturation, setLightSaturation] = useState<number>(defaults.lightSaturation);
  const [lightSaturationEasing, setLightSaturationEasing] = useState<easingOptionsType>(defaults.lightSaturationEasing);

  const loaded = true;

  function updateKeyColor(hex: string) {
    let value = hex.toUpperCase();
    if (value[0] === "#") {
      value = value.substring(1);
    }
    if (value.length > 8) {
      value = value.substring(0, 8);
    }
    setKeyColor(value);
  };

  function updateCount(type: 'light' | 'dark', count: number) {
    if (count < 0) { count = 0; }
    if (count > 10) { count = 10; }
    if (type === 'light') {
      setLightCount(count);
    } else if (type === 'dark') {
      setDarkCount(count);
    }
  };

  function updateBrightness(type: 'light' | 'dark', value: number) {
    if (value < 0) { value = 0; }
    if (value > 100) { value = 100; }
    if (type === 'light') {
      setLightness(value);
    } else if (type === 'dark') {
      setDarkness(value);
    }
  }

  function updateRotation(type: 'light' | 'dark', value: number) {
    if (value < -360) { value = -360; }
    if (value > 360) { value = 360; }
    if (type === 'light') {
      setLightRotation(value);
    } else if (type === 'dark') {
      setDarkRotation(value);
    }
  }

  function updateSaturation(type: 'light' | 'dark', value: number) {
    if (value < -100) { value = -100; }
    if (value > 100) { value = 100; }
    if (type === 'light') {
      setLightSaturation(value);
    } else if (type === 'dark') {
      setDarkSaturation(value);
    }
  }

  function updateEasing(type: 'light' | 'dark', property: 'brightness' | 'saturation' | 'hue', easing: easingOptionsType) {
    if (type === 'light') {
      switch (property) {
        case 'brightness':
          setLightnessEasing(easing);
          break;
        case 'saturation':
          setLightSaturationEasing(easing);
          break;
        case 'hue':
          setLightRotationEasing(easing);
          break;
      }
    } else if (type === 'dark') {
      switch (property) {
        case 'brightness':
          setDarknessEasing(easing);
          break;
        case 'saturation':
          setDarkSaturationEasing(easing);
          break;
        case 'hue':
          setDarkRotationEasing(easing);
          break;
      }
    }
  }

  const exposed = {
    loaded,
    keyColor,
    darkCount,
    lightCount,
    darkness,
    darknessEasing,
    lightness,
    lightnessEasing,
    darkRotation,
    darkRotationEasing,
    lightRotation,
    lightRotationEasing,
    darkSaturation,
    darkSaturationEasing,
    lightSaturation,
    lightSaturationEasing,
    updateKeyColor,
    updateCount,
    updateBrightness,
    updateRotation,
    updateSaturation,
    updateEasing,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSessionContext = () => useContext(Context);
export default Provider;
