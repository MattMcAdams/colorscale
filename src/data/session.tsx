import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import moveIndex from "../functions/moveIndex";
import { easingOptions } from "../types/easing";
import type { config } from "../types/config";
import type { context } from "../types/context";
import type { library } from "../types/library";

import { defaults, nullProvider } from "./defaults";
import { limits } from "./limits";

interface Props {
  children: React.ReactNode;
}

const legacyProps = ['darkCount', 'lightCount', 'darkness', 'darknessEasing', 'lightness', 'lightnessEasing', 'darkRotation', 'darkRotationEasing', 'lightRotation', 'lightRotationEasing', 'darkSaturation', 'darkSaturationEasing', 'lightSaturation', 'lightSaturationEasing'];

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
  shiftLibrary: nullProvider,
  loadLibrary: nullProvider,
  createGroup: nullProvider,
  addToGroup: nullProvider,
  removeFromGroup: nullProvider,
  deleteGroup: nullProvider,
  shiftGroup: nullProvider,
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
  const [library, setLibrary] = useState<library>({ configs: [], groups: [] });
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

  const updateConfigDirty = useCallback(() => {
    if (config.id) {
      const libraryEntry = library.configs.find((x) => x.id === config.id);
      if (JSON.stringify(config) === JSON.stringify(libraryEntry)) {
        setConfigDirty(false);
      } else {
        setConfigDirty(true);
      }
    } else {
      setConfigDirty(true);
    }
  }, [config, library.configs]);

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
    let legacyConfig = false;
    legacyProps.forEach((key) => {
      if (Object.hasOwn(CONFIG, key)) { legacyConfig = true; }
    });
    if (legacyConfig) {
      loadLegacyConfig(configString);
    } else {
      ['keyColor', 'id', 'name'].forEach((key) => {
        if (Object.hasOwn(CONFIG, key) && typeof CONFIG[key] !== 'object') {
          newConfig[key] = CONFIG[key];
        }
      });
      if (typeof CONFIG.light === 'object') {
        Object.getOwnPropertyNames(defaults.config.light).forEach((key) => {
          if (Object.hasOwn(CONFIG.light, key)) {
            newConfig.light[key] = CONFIG.light[key];
          }
        });
      }
      if (typeof CONFIG.dark === 'object') {
        Object.getOwnPropertyNames(defaults.config.dark).forEach((key) => {
          if (Object.hasOwn(CONFIG.dark, key)) {
            newConfig.dark[key] = CONFIG.dark[key];
          }
        });
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
    const CONFIG = localStorage.getItem('colorToolConfig');
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
    if (configLoaded) {
      saveConfigToLocalStorage(config);
      updateConfigDirty();
    }
  }, [config, configLoaded, saveConfigToLocalStorage, updateConfigDirty]);

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
      const newConfig = { ...config };
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
      console.error("No ID found for config, delete operation not performed.");
    }
  }

  function shiftLibrary(oldIndex: number, newIndex: number) {
    const newLibrary = { ...library };
    moveIndex(newLibrary.configs, oldIndex, newIndex);
    setLibrary(newLibrary);
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
  };

  const addToGroup = (configID: string, groupID: string) => {
    const newLibrary = { ...library };
    const groupIndex = newLibrary.groups.findIndex(
      (group) => group.id === groupID
    );
    newLibrary.groups[groupIndex].configIDs.push(configID);
    setLibrary(newLibrary);
  };

  const removeFromGroup = (configID: string, groupID: string) => {
    const newLibrary = { ...library };
    const groupIndex = newLibrary.groups.findIndex(
      (group) => group.id === groupID
    );
    const configIndex =
      newLibrary.groups[groupIndex].configIDs.indexOf(configID);
    newLibrary.groups[groupIndex].configIDs.splice(configIndex, 1);
    setLibrary(newLibrary);
  };

  const deleteGroup = (groupID: string) => {
    const newLibrary = { ...library };
    const groupIndex = newLibrary.groups.findIndex(
      (group) => group.id === groupID
    );
    newLibrary.groups.splice(groupIndex, 1);
    setLibrary(newLibrary);
  };

  const shiftGroup = (groupID: string, oldIndex: number, newIndex: number) => {
    const newLibrary = { ...library };
    newLibrary.groups.find((group) => {
      if (group.id === groupID) {
        moveIndex(group.configIDs, oldIndex, newIndex);
      }
    });
    setLibrary(newLibrary);
  };

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
    const library: library = { configs: [], groups: [] };
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
    shiftLibrary,
    shiftGroup,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSessionContext = () => useContext(Context);
export default Provider;
