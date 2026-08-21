import { useEffect, useState, type ReactElement } from "react";
import Header from "./components/Header";
import MainSection from "./components/Main";
import Footer from "./components/Footer";
import { ModeContext } from "./store/app-context";

const App = (): ReactElement => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <ModeContext.Provider value={{ darkMode, setDarkMode }}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header></Header>
      <MainSection></MainSection>
      <Footer></Footer>
    </ModeContext.Provider>
  );
};

export default App;
