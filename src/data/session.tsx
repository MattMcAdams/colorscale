import { createContext, useContext, useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const defaults = {
  loaded: false,
  keyColor: "FFBE98",
  darkCount: 4,
  darkness: 50,
  nullProvider: () =>
    console.error("Context Provider for the Session is not loaded"),
};

type contextType = {
  loaded: boolean;
  keyColor: string;
  darkCount: number;
  darkness: number;
  updateKeyColor: (hex: string) => void;
  updateDarkCount: (count: number) => void;
  updateDarkness: (value: number) => void;
};

const Context = createContext<contextType>({
  loaded: defaults.loaded,
  keyColor: defaults.keyColor,
  darkCount: defaults.darkCount,
  darkness: defaults.darkness,
  updateKeyColor: defaults.nullProvider,
  updateDarkCount: defaults.nullProvider,
  updateDarkness: defaults.nullProvider,
});

const Provider: React.FC<Props> = ({ children }) => {
  const [keyColor, setKeyColor] = useState<string>(defaults.keyColor);
  const [darkCount, setDarkCount] = useState<number>(defaults.darkCount);
  const [darkness, setDarkness] = useState<number>(defaults.darkness);

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

  const exposed = {
    loaded,
    keyColor,
    darkCount,
    darkness,
    updateKeyColor,
    updateDarkCount,
    updateDarkness,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSessionContext = () => useContext(Context);
export default Provider;
