import React from 'react'
import styled from 'styled-components'
export interface HomeUserInterface {}

const HomeUser: React.FC<HomeUserInterface> = () => {
  return (
    <HomeUserStyle>
      HomeUser
      <br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a
    </HomeUserStyle>
  )
}

export const HomeUserStyle = styled.div`
  position: relative;
  width: 30%;
  background-color: blue;
  padding: 20px;
`

export default HomeUser
