import { createContext } from "react";

const ModeContext = createContext<{
  darkMode: boolean;
  setDarkMode: (name: boolean) => void;
}>({
  darkMode: false,
  setDarkMode: () => {},
});

export { ModeContext };
