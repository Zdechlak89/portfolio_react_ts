import "./Header.scss";
import { useContext } from "react";
import { ModeContext } from "../store/app-context";

function Header() {
  const { themeMode, setThemeMode } = useContext(ModeContext);

  const switchThemeMode = () => {
    const modeClass = themeMode === "light" ? "dark" : "light";
    setThemeMode(modeClass);
  };

  return (
    <>
      <header>
        <nav className="">
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
        </nav>
        <button
          className={`mode ` + themeMode}
          onClick={switchThemeMode}
        ></button>
        <div>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
        </div>
      </header>
    </>
  );
}

export default Header;
