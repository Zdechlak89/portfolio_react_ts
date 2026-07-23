import { createContext, useContext } from "react";

const ModeContext = createContext<{
  darkMode: boolean;
  setDarkMode: (name: boolean) => void;
}>({
  darkMode: false,
  setDarkMode: () => {},
});

export const useModeContext = () => useContext(ModeContext);

export { ModeContext };
