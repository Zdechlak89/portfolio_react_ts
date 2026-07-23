import "./Header.scss";
import { useModeContext } from "../store/app-context";
import Link from "./Link";
import ModeButton from "./ModeButton";

function Header() {
  const { darkMode, setDarkMode } = useModeContext();

  const switchDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <header>
        <nav>
          <Link href="#main">Main</Link>
          <Link href="#story">Story</Link>
          <Link href="#">Link</Link>
          <Link href="#contact">Contact</Link>
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
