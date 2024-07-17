import React from "react"
import styled from "styled-components"
import logo from "/logo.png"
import { theme } from "@/helpers/Theme"

export interface SpinnerInterface {}

const Spinner: React.FC<SpinnerInterface> = () => {
  return (
    <SpinnerStyle>
      <img
        src={logo}
        alt="Phoenix"
        className={"spinImg"}
      />
      <div className={"spin"}>
        <div className={"c1"}></div>
        <div className={"c2"}></div>
        <div className={"c3"}></div>
      </div>
    </SpinnerStyle>
  )
}

export const SpinnerStyle = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: #ffffffaa;
  z-index: 999999999999999999;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  .spinImg {
    position: absolute;
    object-fit: fill;
    width: 60px;
  }
  .spin {
    position: relative;
    display: flex;
    justify-content: center;
    z-index: 9999;
    top: -50px;
    background-color: black;
  }
  .spin div {
    position: absolute;
    border-radius: 50%;
    border: 5px solid transparent;
    animation: spin linear infinite;
    border-bottom-color: ${theme.palette.primary.main};
  }
  .spin .c1 {
    width: 80px;
    height: 80px;
    animation-duration: 0.85s;
  }
  .spin .c2 {
    top: -10px;
    width: 100px;
    height: 100px;
    animation-duration: 0.95s;
  }
  .spin .c3 {
    top: -20px;
    width: 120px;
    height: 120px;
    animation-duration: 1.05s;
  }
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export default Spinner
