import "./App.scss";
import React, { useState } from "react";
import Header from "./components/Header";
import MainSection from "./components/Main";
import { ModeContext } from "./store/app-context";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return (
    <ModeContext.Provider value={{ darkMode, setDarkMode }}>
      <Header></Header>
      <MainSection></MainSection>
    </ModeContext.Provider>
  );
};

export default App;
