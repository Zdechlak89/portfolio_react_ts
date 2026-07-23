import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface ModeContextValue {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const ModeContext = createContext<ModeContextValue>({
  darkMode: false,
  setDarkMode: () => {},
});

export const useModeContext = (): ModeContextValue => useContext(ModeContext);

export { ModeContext };
