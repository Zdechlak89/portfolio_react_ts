import styled from "styled-components";
import lightModeIcon from "../assets/light_mode.svg";
import darkModeIcon from "../assets/dark_mode.svg";

const ModeButton = styled.button`
  position: static;
  background-image: url(${lightModeIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 18px;
  background-color: transparent;
  border: 1px solid var(--color-border-strong);
  border-radius: 2px;
  width: 32px;
  height: 32px;
  flex-shrink: 0;

  &:hover {
    background-color: var(--color-surface-muted);
    border-color: var(--color-ink);
  }

  .dark & {
    background-image: url(${darkModeIcon});
    filter: invert(90%);
  }
`;
export default ModeButton;
