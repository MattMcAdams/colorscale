import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { easingOptions } from "../types/easing";
import type { config } from "../types/configObj";
import type { context } from "../types/context";

import { defaults, nullProvider } from "./defaults";
import { limits } from "./limits";

interface Props {
  children: React.ReactNode;
}

const Context = createContext<context>({
  ...defaults,
  loadConfig: nullProvider,
  updateAdvColorInfo: nullProvider,
  updateKeyColor: nullProvider,
  updateConfig: nullProvider,
  updateConfigEasing: nullProvider,
  saveToLibrary: nullProvider,
  deleteFromLibrary: nullProvider,
  loadLibrary: nullProvider,
});

const Provider: React.FC<Props> = ({ children }) => {
  /* =================================================================
  /* SECTION Stores
  ================================================================= */

  const providerLoaded = true;
  const [configLoaded, setConfigLoaded] = useState<boolean>(
    defaults.configLoaded
  );
  const [config, setConfig] = useState<config>({ ...defaults.config });
  const [advColorInfo, setAdvColorInfo] = useState<boolean>(
    defaults.advColorInfo
  );
  const [library, setLibrary] = useState<config[]>([]);
  const [libraryLoaded, setLibraryLoaded] = useState<boolean>(false);

  /* !SECTION Stores */

  function updateAdvColorInfo(value: boolean) {
    setAdvColorInfo(value);
  }

  /* =================================================================
  /* SECTION Update configuration functions
  ================================================================= */

  function updateKeyColor(hex: string) {
    let value = hex.toUpperCase();
    if (value[0] === "#") {
      value = value.substring(1);
    }
    if (value.length > 8) {
      value = value.substring(0, 8);
    }
    setConfig({ ...config, keyColor: value });
  }

  function updateConfig(
    key: "light" | "dark",
    property: "brightness" | "saturation" | "angle" | "count",
    value: number
  ) {
    const newConfig = { ...config };
    let sanitizedValue = value;
    if (sanitizedValue < limits[property].min) {
      sanitizedValue = limits[property].min;
    }
    if (sanitizedValue > limits[property].max) {
      sanitizedValue = limits[property].max;
    }
    newConfig[key][property] = sanitizedValue;
    setConfig(newConfig);
  }

  function updateConfigEasing(
    key: "light" | "dark",
    property: "brightness" | "saturation" | "angle",
    easing: easingOptions
  ) {
    const newConfig = { ...config };
    let sanitizedValue = easing;
    if (!easingOptions.includes(easing)) {
      sanitizedValue = "linear";
    }
    newConfig[key][`${property}Ease`] = sanitizedValue;
    setConfig(newConfig);
  }

  /* !SECTION Update configuration functions */
  /* =================================================================
  /* SECTION Load configuration functions
  ================================================================= */

  function loadLegacyConfig(configString: string) {
    const CONFIG = JSON.parse(configString || "{}");
    const newConfig = {
      keyColor: defaults.config.keyColor,
      dark: {
        count: defaults.config.dark.count,
        brightness: defaults.config.dark.brightness,
        brightnessEase: defaults.config.dark.brightnessEase,
        angle: defaults.config.dark.angle,
        angleEase: defaults.config.dark.angleEase,
        saturation: defaults.config.dark.saturation,
        saturationEase: defaults.config.dark.saturationEase,
      },
      light: {
        count: defaults.config.light.count,
        brightness: defaults.config.light.brightness,
        brightnessEase: defaults.config.light.brightnessEase,
        angle: defaults.config.light.angle,
        angleEase: defaults.config.light.angleEase,
        saturation: defaults.config.light.saturation,
        saturationEase: defaults.config.light.saturationEase,
      },
    };
    if (CONFIG.keyColor !== undefined) {
      newConfig.keyColor = CONFIG.keyColor;
    }
    if (CONFIG.darkCount !== undefined) {
      newConfig.dark.count = CONFIG.darkCount;
    }
    if (CONFIG.lightCount !== undefined) {
      newConfig.light.count = CONFIG.lightCount;
    }
    if (CONFIG.darkness !== undefined) {
      newConfig.dark.brightness = CONFIG.darkness;
    }
    if (CONFIG.darknessEasing !== undefined) {
      newConfig.dark.brightnessEase = CONFIG.darknessEasing;
    }
    if (CONFIG.lightness !== undefined) {
      newConfig.light.brightness = CONFIG.lightness;
    }
    if (CONFIG.lightnessEasing !== undefined) {
      newConfig.light.brightnessEase = CONFIG.lightnessEasing;
    }
    if (CONFIG.darkRotation !== undefined) {
      newConfig.dark.angle = CONFIG.darkRotation;
    }
    if (CONFIG.darkRotationEasing !== undefined) {
      newConfig.dark.angleEase = CONFIG.darkRotationEasing;
    }
    if (CONFIG.lightRotation !== undefined) {
      newConfig.light.angle = CONFIG.lightRotation;
    }
    if (CONFIG.lightRotationEasing !== undefined) {
      newConfig.light.angleEase = CONFIG.lightRotationEasing;
    }
    if (CONFIG.darkSaturation !== undefined) {
      newConfig.dark.saturation = CONFIG.darkSaturation;
    }
    if (CONFIG.darkSaturationEasing !== undefined) {
      newConfig.dark.saturationEase = CONFIG.darkSaturationEasing;
    }
    if (CONFIG.lightSaturation !== undefined) {
      newConfig.light.saturation = CONFIG.lightSaturation;
    }
    if (CONFIG.lightSaturationEasing !== undefined) {
      newConfig.light.saturationEase = CONFIG.lightSaturationEasing;
    }
    setConfig(newConfig);
  }

  const loadConfig = useCallback((configString: string) => {
    const CONFIG = JSON.parse(configString || "{}");
    const newConfig = {
      keyColor: defaults.config.keyColor,
      dark: {
        count: defaults.config.dark.count,
        brightness: defaults.config.dark.brightness,
        brightnessEase: defaults.config.dark.brightnessEase,
        angle: defaults.config.dark.angle,
        angleEase: defaults.config.dark.angleEase,
        saturation: defaults.config.dark.saturation,
        saturationEase: defaults.config.dark.saturationEase,
      },
      light: {
        count: defaults.config.light.count,
        brightness: defaults.config.light.brightness,
        brightnessEase: defaults.config.light.brightnessEase,
        angle: defaults.config.light.angle,
        angleEase: defaults.config.light.angleEase,
        saturation: defaults.config.light.saturation,
        saturationEase: defaults.config.light.saturationEase,
      },
    };
    if (
      CONFIG.darkCount ||
      CONFIG.lightCount ||
      CONFIG.darkness ||
      CONFIG.darknessEasing ||
      CONFIG.lightness ||
      CONFIG.lightnessEasing ||
      CONFIG.darkRotation ||
      CONFIG.darkRotationEasing ||
      CONFIG.lightRotation ||
      CONFIG.lightRotationEasing ||
      CONFIG.darkSaturation ||
      CONFIG.darkSaturationEasing ||
      CONFIG.lightSaturation ||
      CONFIG.lightSaturationEasing
    ) {
      loadLegacyConfig(configString);
    } else {
      if (CONFIG.keyColor !== undefined) {
        newConfig.keyColor = CONFIG.keyColor;
      }
      if (CONFIG.dark !== undefined) {
        if (CONFIG.dark.count !== undefined) {
          newConfig.dark.count = CONFIG.dark.count;
        }
        if (CONFIG.dark.brightness !== undefined) {
          newConfig.dark.brightness = CONFIG.dark.brightness;
        }
        if (CONFIG.dark.brightnessEase !== undefined) {
          newConfig.dark.brightnessEase = CONFIG.dark.brightnessEase;
        }
        if (CONFIG.dark.angle !== undefined) {
          newConfig.dark.angle = CONFIG.dark.angle;
        }
        if (CONFIG.dark.angleEase !== undefined) {
          newConfig.dark.angleEase = CONFIG.dark.angleEase;
        }
        if (CONFIG.dark.saturation !== undefined) {
          newConfig.dark.saturation = CONFIG.dark.saturation;
        }
        if (CONFIG.dark.saturationEase !== undefined) {
          newConfig.dark.saturationEase = CONFIG.dark.saturationEase;
        }
      }
      if (CONFIG.light !== undefined) {
        if (CONFIG.light.count !== undefined) {
          newConfig.light.count = CONFIG.light.count;
        }
        if (CONFIG.light.brightness !== undefined) {
          newConfig.light.brightness = CONFIG.light.brightness;
        }
        if (CONFIG.light.brightnessEase !== undefined) {
          newConfig.light.brightnessEase = CONFIG.light.brightnessEase;
        }
        if (CONFIG.light.angle !== undefined) {
          newConfig.light.angle = CONFIG.light.angle;
        }
        if (CONFIG.light.angleEase !== undefined) {
          newConfig.light.angleEase = CONFIG.light.angleEase;
        }
        if (CONFIG.light.saturation !== undefined) {
          newConfig.light.saturation = CONFIG.light.saturation;
        }
        if (CONFIG.light.saturationEase !== undefined) {
          newConfig.light.saturationEase = CONFIG.light.saturationEase;
        }
      }
      setConfig(newConfig);
    }
    setConfigLoaded(true);
  }, []);

  /* !SECTION Load configuration functions */
  /* =================================================================
  /* SECTION Load Config on page load
  ================================================================= */

  useEffect(() => {
    const CONFIG = localStorage.getItem("colorToolConfig");
    if (!configLoaded && CONFIG) {
      loadConfig(CONFIG);
    } else if (!configLoaded && !CONFIG) {
      setConfigLoaded(true);
    }
  }, [configLoaded, loadConfig]);

  /* !SECTION Load Config on page load */
  /* =================================================================
  /* SECTION Save config to local storage
  ================================================================= */

  const saveConfigToLocalStorage = useCallback(
    (config: config) => {
      if (configLoaded) {
        localStorage.setItem(
          "colorToolConfig",
          JSON.stringify(config, undefined, 4)
        );
      }
    },
    [configLoaded]
  );

  useEffect(() => {
    saveConfigToLocalStorage(config);
  }, [config, saveConfigToLocalStorage]);

  /* !SECTION Save config to local storage */
  /* =================================================================
  /* SECTION Library functions
  ================================================================= */

  function saveToLibrary(config: config) {
    const newLibrary = [...library];
    newLibrary.push(config);
    setLibrary(newLibrary);
  }

  function deleteFromLibrary(config: config) {
    const newLibrary = [...library];
    const index = newLibrary.indexOf(config);
    newLibrary.splice(index, 1);
    setLibrary(newLibrary);
  }

  /* !SECTION Library functions */
  /* =================================================================
  /* SECTION Save Library to local storage
  ================================================================= */

  const saveLibraryToLocalStorage = useCallback(
    (library: config[]) => {
      if (libraryLoaded) {
        localStorage.setItem(
          "colorToolLibrary",
          JSON.stringify(library, undefined, 4)
        );
      }
    },
    [libraryLoaded]
  );

  useEffect(() => {
    saveLibraryToLocalStorage(library);
  }, [library, saveLibraryToLocalStorage]);

  /* !SECTION Save Library to local storage */
  /* =================================================================
  /* SECTION Load library from local storage
  ================================================================= */

  const loadLibrary = useCallback((libraryString: string) => {
    const localStore = JSON.parse(libraryString || "[]");
    const library: config[] = [];
    for (const key in localStore) {
      library.push(localStore[key]);
    }
    setLibrary(library);
    setLibraryLoaded(true);
  }, []);

  useEffect(() => {
    if (!libraryLoaded) {
      loadLibrary(localStorage.getItem("colorToolLibrary") || "[]");
    }
  }, [libraryLoaded, loadLibrary]);

  /* !SECTION Load library from local storage */

  const exposed = {
    providerLoaded,
    configLoaded,
    libraryLoaded,
    advColorInfo,
    config,
    library,
    updateAdvColorInfo,
    updateKeyColor,
    updateConfig,
    updateConfigEasing,
    loadConfig,
    loadLibrary,
    saveToLibrary,
    deleteFromLibrary,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSessionContext = () => useContext(Context);
export default Provider;
