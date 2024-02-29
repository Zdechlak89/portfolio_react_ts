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
  width: 32px;
  height: 32px;

  &:hover {
    background-color: #80808080;
    cursor: pointer;
  }

  .dark & {
    background-image: url("./dark_mode_FILL0_wght400_GRAD0_opsz24.svg");
    filter: invert(90%);
  }
`;
export default ModeButton;
