import type { AnchorHTMLAttributes, FC, MouseEvent, ReactNode } from "react";
import styled from "styled-components";
import { gsap } from "../lib/gsap";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

const StyledLink = styled.a``;

const Link: FC<LinkProps> = ({ href, children, onClick, ...props }) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement,
            offsetY: 60,
          },
          ease: "power2.inOut",
        });
      }
    }

    onClick?.(e);
  };

  return (
    <StyledLink href={href} onClick={handleClick} {...props}>
      {children}
    </StyledLink>
  );
};

export default Link;
