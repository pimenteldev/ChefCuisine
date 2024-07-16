import { APP_NAME, APP_SUBNAME, COLORS } from "@/constants/utilitys"
import React from "react"
import styled from "styled-components"
export interface LoginCardTitleInterface {}

const LoginCardTitle: React.FC<LoginCardTitleInterface> = () => {
  return (
    <LoginCardTitleStyle>
      <h1>{APP_NAME}</h1>
      <h4>{APP_SUBNAME}</h4>
    </LoginCardTitleStyle>
  )
}

export const LoginCardTitleStyle = styled.div`
  h1 {
    font-weight: 900;
    color: ${COLORS.primary};
    font-size: 3em;
    margin: 0;
    padding: 0;
    text-decoration: underline;
    text-align: center;
  }
  h4 {
    color: ${COLORS.text};
    text-align: center;
    margin-top: 0;
    padding: 0;
  }

  @media screen and (max-width: 375px) {
    h1 {
      font-size: 2em;
    }
    h4 {
      font-size: 0.8em;
    }
  }
`

export default LoginCardTitle
