import styled from "styled-components";

const ModeButton = styled.button`
  top: 64px;
  right: 64px;
  position: fixed;
  background-image: url("./light_mode_FILL0_wght400_GRAD0_opsz24.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  border: 0 none;
  width: 44px;
  height: 44px;
  z-index: 9;

  &:hover {
    background-color: #80808080;
    cursor: pointer;
  }

  .dark & {
    background-image: url("./dark_mode_FILL0_wght400_GRAD0_opsz24.svg");
    filter: invert(90%);
  }

  @media (max-width: 600px) {
    top: 24px;
    right: 20px;
  }
`;
export default ModeButton;
