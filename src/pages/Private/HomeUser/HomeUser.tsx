import React from "react"
export interface HomeUserInterface {}

const HomeUser: React.FC<HomeUserInterface> = () => {
  return <div>Ruta protegida por Guard para el Rol de Usuario</div>
}

export default HomeUser
