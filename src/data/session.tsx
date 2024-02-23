import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { easingOptions } from "../types/easing";
import type { config } from "../types/config";
import type { context } from "../types/context";
import type { library } from "../types/library";

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
  updateName: nullProvider,
  updateConfig: nullProvider,
  updateConfigEasing: nullProvider,
  saveToLibrary: nullProvider,
  deleteFromLibrary: nullProvider,
  loadLibrary: nullProvider,
  createGroup: nullProvider,
  addToGroup: nullProvider,
  removeFromGroup: nullProvider,
  deleteGroup: nullProvider,
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
  const [configDirty, setConfigDirty] = useState<boolean>(defaults.configDirty);
  const [advColorInfo, setAdvColorInfo] = useState<boolean>(
    defaults.advColorInfo
  );
  const [library, setLibrary] = useState<library>({configs: [], groups: []});
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

  function updateName(newName: string) {
    const newConfig = { ...config };
    newConfig.name = newName;
    setConfig(newConfig);
  }

  function updateConfigDirty() {
    if (config.id) {
      const libraryEntry = library.configs.find(x => x.id === config.id);
      if (JSON.stringify(config) === JSON.stringify(libraryEntry)) {
        setConfigDirty(false);
      } else {
        setConfigDirty(true);
      }
    } else {
      setConfigDirty(true);
    }
  }

  /* !SECTION Update configuration functions */
  /* =================================================================
  /* SECTION Load configuration functions
  ================================================================= */

  function loadLegacyConfig(configString: string) {
    const CONFIG = JSON.parse(configString || "{}");
    const newConfig = JSON.parse(JSON.stringify(defaults.config));
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
    const newConfig = JSON.parse(JSON.stringify(defaults.config));
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
      if (CONFIG.id !== undefined) {
        newConfig.id = CONFIG.id;
      }
      if (CONFIG.name !== undefined) {
        newConfig.name = CONFIG.name;
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
    console.log('config', config);
    updateConfigDirty();
    saveConfigToLocalStorage(config);
  }, [config, saveConfigToLocalStorage]);

  /* !SECTION Save config to local storage */
  /* =================================================================
  /* SECTION Library functions
  ================================================================= */

  function saveToLibrary(config: config, name?: string, saveAs?: boolean) {
    const newConfig = JSON.parse(JSON.stringify(config));
    if (config.id && !saveAs) {
      const newLibrary = { ...library };
      const index = newLibrary.configs.findIndex((c) => c.id === config.id);
      if (index === -1) {
        newLibrary.configs.push(newConfig);
      } else {
        newLibrary.configs[index] = newConfig;
      }
      setLibrary(newLibrary);
      updateConfigDirty();
    } else {
      const newLibrary = { ...library };
      newConfig.id = uuidv4();
      newConfig.name = name || "Untitled";
      newLibrary.configs.push(newConfig);
      setLibrary(newLibrary);
      setConfig(JSON.parse(JSON.stringify(newConfig)));
    }
  }

  function deleteFromLibrary(refConfig: config) {
    if (refConfig.id === config.id) {
      const newConfig = { ...config }
      delete newConfig.id;
      setConfig(newConfig);
    }
    if (refConfig.id) {
      const newLibrary = { ...library };
      const index = newLibrary.configs.indexOf(refConfig);
      newLibrary.configs.splice(index, 1);
      // TODO: Loop through groups, deleting ID from matching groups
      setLibrary(newLibrary);
    } else {
      console.log('No ID found for config, delete operation not performed.');
    }
  }

  /* !SECTION Library functions */
  /* =================================================================
  /* SECTION Group functions
  ================================================================= */

  const createGroup = (name: string) => {
    const newLibrary = { ...library };
    const newGroup = { id: uuidv4(), name, configIDs: [] };
    newLibrary.groups.push(newGroup);
    setLibrary(newLibrary);
  }

  const addToGroup = (configID: string, groupID: string) => {
    const newLibrary = { ...library };
    const groupIndex = newLibrary.groups.findIndex((group) => group.id === groupID);
    newLibrary.groups[groupIndex].configIDs.push(configID);
    setLibrary(newLibrary);
  }

  const removeFromGroup = (configID: string, groupID: string) => {
    const newLibrary = { ...library };
    const groupIndex = newLibrary.groups.findIndex((group) => group.id === groupID);
    const configIndex = newLibrary.groups[groupIndex].configIDs.indexOf(configID);
    newLibrary.groups[groupIndex].configIDs.splice(configIndex, 1);
    setLibrary(newLibrary);
  }

  const deleteGroup = (groupID: string) => {
    const newLibrary = { ...library };
    const groupIndex = newLibrary.groups.findIndex((group) => group.id === groupID);
    newLibrary.groups.splice(groupIndex, 1);
    setLibrary(newLibrary);
  }

  /* !SECTION Group functions */
  /* =================================================================
  /* SECTION Save Library to local storage
  ================================================================= */

  const saveLibraryToLocalStorage = useCallback(
    (library: library) => {
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
    const localStore = JSON.parse(libraryString || "{configs: [], groups: []}");
    const library: library = {configs: [], groups: []};
    for (const key in localStore.configs) {
      if (localStore.configs[key]) {
        library.configs.push(localStore.configs[key]);
      }
    }
    for (const key in localStore.groups) {
      if (localStore.groups[key]) {
        library.groups.push(localStore.groups[key]);
      }
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
    configDirty,
    advColorInfo,
    config,
    library,
    updateAdvColorInfo,
    updateKeyColor,
    updateName,
    updateConfig,
    updateConfigEasing,
    loadConfig,
    loadLibrary,
    saveToLibrary,
    deleteFromLibrary,
    createGroup,
    addToGroup,
    removeFromGroup,
    deleteGroup,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSessionContext = () => useContext(Context);
export default Provider;
