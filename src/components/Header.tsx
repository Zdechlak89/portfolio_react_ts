import "./Header.scss";
import { useContext } from "react";
import { ModeContext } from "../store/app-context";

function Header() {
  const { darkMode, setDarkMode } = useContext(ModeContext);

  const switchDarkMode = () => {
    setDarkMode(darkMode ? false : true);
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
          className={`mode ` + darkMode}
          onClick={switchDarkMode}
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
