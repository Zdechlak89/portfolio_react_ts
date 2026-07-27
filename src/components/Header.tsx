import { useState } from "react";
import "./Header.scss";
import { useModeContext } from "../store/app-context";
import Link from "./Link";
import ModeButton from "./ModeButton";

const NAV_LINKS = [
  { href: "#main", label: "Main" },
  { href: "#story", label: "Story" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "https://www.linkedin.com", label: "LinkedIn" },
];

function Header(): JSX.Element {
  const { darkMode, setDarkMode } = useModeContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  const closeMenu = (): void => setMenuOpen(false);

  return (
    <>
      <header>
        <button
          type="button"
          className="hamburger"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hamburger__bar"></span>
          <span className="hamburger__bar"></span>
          <span className="hamburger__bar"></span>
        </button>

        <nav aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <ModeButton
          className="mode"
          onClick={switchDarkMode}
          aria-label={
            darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          aria-pressed={darkMode}
        ></ModeButton>

        <div className="header-links">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ))}
        </div>

        <div
          id="mobile-menu"
          className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <nav aria-label="Mobile" className="mobile-menu__nav">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-menu__socials">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            ))}
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={darkMode}
            className="mode-switch"
            onClick={switchDarkMode}
          >
            <span>Dark mode</span>
            <span className="mode-switch__track">
              <span className="mode-switch__thumb"></span>
            </span>
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
