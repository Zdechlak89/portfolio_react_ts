import { createContext } from "react";

const ModeContext = createContext<{
  themeMode: string;
  setThemeMode: (name: string) => void;
}>({
  themeMode: "light",
  setThemeMode: () => {},
});

export { ModeContext };
