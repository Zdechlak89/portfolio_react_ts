import "./App.scss";
import React, { useState } from "react";
import Header from "./components/Header";
import MainSection from "./components/Main";
import { ModeContext } from "./store/app-context";

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<string>("light");

  return (
    <ModeContext.Provider value={{ themeMode, setThemeMode }}>
      <div className={themeMode}>
        <Header></Header>
        <MainSection></MainSection>
      </div>
    </ModeContext.Provider>
  );
};

export default App;
