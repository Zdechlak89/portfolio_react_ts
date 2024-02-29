import "./Header.scss";
import { useContext } from "react";
import { ModeContext } from "../store/app-context";
import Link from "./Link";
import ModeButton from "./ModeButton";

function Header() {
  const { darkMode, setDarkMode } = useContext(ModeContext);

  const switchDarkMode = () => {
    setDarkMode(darkMode ? false : true);
  };

  return (
    <>
      <header>
        <nav className="">
          <Link href="#">Link</Link>
          <Link href="#">Link</Link>
          <Link href="#">Link</Link>
          <Link href="#">Link</Link>
        </nav>
        <ModeButton
          className={`mode ` + darkMode}
          onClick={switchDarkMode}
        ></ModeButton>
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
