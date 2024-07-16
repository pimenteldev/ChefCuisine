import React from "react"
import styled from "styled-components"
import logo from "/icon.png"
import { COLORS } from "@/constants/utilitys"

export interface LoginCardFigureInterface {}

const LoginCardFigure: React.FC<LoginCardFigureInterface> = () => {
  return (
    <LoginCardFigureStyle>
      <figure>
        <img
          src={logo}
          alt="LogoPhoenixAPP"
          role="img"
        />
      </figure>
    </LoginCardFigureStyle>
  )
}

export const LoginCardFigureStyle = styled.div`
  figure {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    height: 125px;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 125px;
  }
  img {
    background-color: ${COLORS.primary};
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }
`

export default LoginCardFigure
