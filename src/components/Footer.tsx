import type { ReactElement } from "react";
import "./Footer.scss";

const PHONE_NUMBER = "+48 504 904 245";
const EMAIL_ADDRESS = "emilaugustynowicz@gmail.com";

const CONTACT_LINKS = [
  {
    href: `tel:${PHONE_NUMBER.replace(/\s+/g, "")}`,
    label: PHONE_NUMBER,
    external: false,
  },
  {
    href: `mailto:${EMAIL_ADDRESS}`,
    label: EMAIL_ADDRESS,
    external: false,
  },
];

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/emil-augustynowicz/", label: "LinkedIn" },
  { href: "https://www.instagram.com/emilaugustynowicz/", label: "Instagram" },
];

const Footer = (): ReactElement => {
  return (
    <footer className="mobile-footer">
      <div className="mobile-footer__contact">
        {CONTACT_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <div className="mobile-footer__socials">
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
    </footer>
  );
};

export default Footer;
