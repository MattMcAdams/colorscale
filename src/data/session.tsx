import { createContext, useContext, useState, useEffect, use } from "react";
import type { easingOptionsType } from "../functions/ease";

interface Props {
  children: React.ReactNode;
}

const defaults = {
  loaded: false,
  configString: '',
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
  configString: string;
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

  load: (value: boolean) => void;
  updateConfigString: (value: string) => void;
  updateKeyColor: (hex: string) => void;
  updateCount: (type: "light" | "dark", count: number) => void;
  updateBrightness: (type: "light" | "dark", value: number) => void;
  updateRotation: (type: "light" | "dark", value: number) => void;
  updateSaturation: (type: "light" | "dark", value: number) => void;
  updateEasing: (type: "light" | "dark", property: "brightness" | "saturation" | "hue", easing: easingOptionsType) => void;
};

const Context = createContext<contextType>({
  loaded: defaults.loaded,
  configString: defaults.configString,
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

  load: defaults.nullProvider,
  updateConfigString: defaults.nullProvider,
  updateKeyColor: defaults.nullProvider,
  updateCount: defaults.nullProvider,
  updateBrightness: defaults.nullProvider,
  updateRotation: defaults.nullProvider,
  updateSaturation: defaults.nullProvider,
  updateEasing: defaults.nullProvider,
});

const Provider: React.FC<Props> = ({ children }) => {
  const [loaded, setLoaded] = useState<boolean>(defaults.loaded);
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
  const [configString, setConfigString] = useState<string>(defaults.configString);

  useEffect(() => {
    const CONFIG = configString ? configString : localStorage.getItem("colorToolConfig");
    if (!loaded && CONFIG) {
      loadConfiguration(CONFIG);
    }
    setLoaded(true);
  }, [loaded, configString]);

  useEffect(() => {
    function saveToLocalStorage() {
      const data = {
        keyColor: keyColor,
        darkCount: darkCount,
        lightCount: lightCount,
        darkness: darkness,
        darknessEasing: darknessEasing,
        lightness: lightness,
        lightnessEasing: lightnessEasing,
        darkRotation: darkRotation,
        darkRotationEasing: darkRotationEasing,
        lightRotation: lightRotation,
        lightRotationEasing: lightRotationEasing,
        darkSaturation: darkSaturation,
        darkSaturationEasing: darkSaturationEasing,
        lightSaturation: lightSaturation,
        lightSaturationEasing: lightSaturationEasing,
      };
      if (loaded) {
        localStorage.setItem(
          "colorToolConfig",
          JSON.stringify(data, undefined, 4)
        );
        setConfigString(JSON.stringify(data, undefined, 4));
      }
    }

    saveToLocalStorage();
  }, [loaded, keyColor, darkCount, lightCount, darkness, darknessEasing, lightness, lightnessEasing, darkRotation, darkRotationEasing, lightRotation, lightRotationEasing, darkSaturation, darkSaturationEasing, lightSaturation, lightSaturationEasing]);

  function loadConfiguration(configString: string) {
    const CONFIG = JSON.parse(configString || "{}");
    if (CONFIG.keyColor) {
      setKeyColor(CONFIG.keyColor);
    }
    if (CONFIG.darkCount) {
      setDarkCount(CONFIG.darkCount);
    }
    if (CONFIG.lightCount) {
      setLightCount(CONFIG.lightCount);
    }
    if (CONFIG.darkness) {
      setDarkness(CONFIG.darkness);
    }
    if (CONFIG.darknessEasing) {
      setDarknessEasing(CONFIG.darknessEasing);
    }
    if (CONFIG.lightness) {
      setLightness(CONFIG.lightness);
    }
    if (CONFIG.lightnessEasing) {
      setLightnessEasing(CONFIG.lightnessEasing);
    }
    if (CONFIG.darkRotation) {
      setDarkRotation(CONFIG.darkRotation);
    }
    if (CONFIG.darkRotationEasing) {
      setDarkRotationEasing(CONFIG.darkRotationEasing);
    }
    if (CONFIG.lightRotation) {
      setLightRotation(CONFIG.lightRotation);
    }
    if (CONFIG.lightRotationEasing) {
      setLightRotationEasing(CONFIG.lightRotationEasing);
    }
    if (CONFIG.darkSaturation) {
      setDarkSaturation(CONFIG.darkSaturation);
    }
    if (CONFIG.darkSaturationEasing) {
      setDarkSaturationEasing(CONFIG.darkSaturationEasing);
    }
    if (CONFIG.lightSaturation) {
      setLightSaturation(CONFIG.lightSaturation);
    }
    if (CONFIG.lightSaturationEasing) {
      setLightSaturationEasing(CONFIG.lightSaturationEasing);
    }
  }

  function load(value: boolean) {
    setLoaded(value);
  }

  function updateConfigString(value: string) {
    setConfigString(value);
  }

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
    configString,
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
    load,
    updateConfigString,
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
