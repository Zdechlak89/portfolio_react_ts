import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import MainSection from "./components/Main";
import { ModeContext } from "./store/app-context";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <ModeContext.Provider value={{ darkMode, setDarkMode }}>
      <Header></Header>
      <MainSection></MainSection>
    </ModeContext.Provider>
  );
};

export default App;
