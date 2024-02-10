import { createContext, useContext, useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const defaults = {
  loaded: false,
  keyColor: "1D9A6C",
  darkCount: 4,
  darkness: 50,
  darkRotation: -50,
  darkSaturation: 15,
  nullProvider: () =>
    console.error("Context Provider for the Session is not loaded"),
};

type contextType = {
  loaded: boolean;
  keyColor: string;
  darkCount: number;
  darkness: number;
  darkRotation: number;
  darkSaturation: number;
  updateKeyColor: (hex: string) => void;
  updateDarkCount: (count: number) => void;
  updateDarkness: (value: number) => void;
  updateDarkRotation: (value: number) => void;
  updateDarkSaturation: (value: number) => void;
};

const Context = createContext<contextType>({
  loaded: defaults.loaded,
  keyColor: defaults.keyColor,
  darkCount: defaults.darkCount,
  darkness: defaults.darkness,
  darkRotation: defaults.darkRotation,
  darkSaturation: defaults.darkSaturation,
  updateKeyColor: defaults.nullProvider,
  updateDarkCount: defaults.nullProvider,
  updateDarkness: defaults.nullProvider,
  updateDarkRotation: defaults.nullProvider,
  updateDarkSaturation: defaults.nullProvider,
});

const Provider: React.FC<Props> = ({ children }) => {
  const [keyColor, setKeyColor] = useState<string>(defaults.keyColor);
  const [darkCount, setDarkCount] = useState<number>(defaults.darkCount);
  const [darkness, setDarkness] = useState<number>(defaults.darkness);
  const [darkRotation, setDarkRotation] = useState<number>(defaults.darkRotation);
  const [darkSaturation, setDarkSaturation] = useState<number>(defaults.darkSaturation);

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

  function updateDarkCount(count: number) {
    if (count < 0) { count = 0; }
    setDarkCount(count);
  };

  function updateDarkness(value: number) {
    if (value < 0) { value = 0; }
    if (value > 100) { value = 100; }
    setDarkness(value);
  }

  function updateDarkRotation(value: number) {
    if (value < -360) { value = -360; }
    if (value > 360) { value = 360; }
    setDarkRotation(value);
  }

  function updateDarkSaturation(value: number) {
    if (value < -100) { value = -100; }
    if (value > 100) { value = 100; }
    setDarkSaturation(value);
  }

  const exposed = {
    loaded,
    keyColor,
    darkCount,
    darkness,
    darkRotation,
    darkSaturation,
    updateKeyColor,
    updateDarkCount,
    updateDarkness,
    updateDarkRotation,
    updateDarkSaturation
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSessionContext = () => useContext(Context);
export default Provider;
