import { useEffect, useState, type ReactElement } from "react";
import BackgroundFan from "./components/BackgroundFan";
import Header from "./components/Header";
import MainSection from "./components/Main";
import { ModeContext } from "./store/app-context";

const App = (): ReactElement => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <ModeContext.Provider value={{ darkMode, setDarkMode }}>
      <BackgroundFan></BackgroundFan>
      <div className="app-content">
        <Header></Header>
        <MainSection></MainSection>
      </div>
    </ModeContext.Provider>
  );
};

export default App;
