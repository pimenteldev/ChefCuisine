import React from 'react'
import styled from 'styled-components'
export interface HomeUserInterface {}

const HomeUser: React.FC<HomeUserInterface> = () => {
  return <HomeUserStyle>Ruta protegida por Guard para el Rol de Usuario</HomeUserStyle>
}

export const HomeUserStyle = styled.div`
  position: relative;
  width: 30%;
  padding: 20px;
`

export default HomeUser
