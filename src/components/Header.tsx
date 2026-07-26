import "./Header.scss";
import { useModeContext } from "../store/app-context";
import Link from "./Link";
import ModeButton from "./ModeButton";

function Header(): JSX.Element {
  const { darkMode, setDarkMode } = useModeContext();

  const switchDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <header>
        <nav>
          <Link href="#main">Main</Link>
          <Link href="#story">Story</Link>
          <Link href="#skills">Skills</Link>
          <Link href="#contact">Contact</Link>
        </nav>
        <ModeButton
          className={`mode ` + darkMode}
          onClick={switchDarkMode}
        ></ModeButton>
        <div className="header-links">
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
        </div>
      </header>
    </>
  );
}

export default Header;
