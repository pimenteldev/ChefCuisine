import { Roles } from "@/models/roles"
import { AppStore } from "@/redux/store"
import { PrivateRoutes } from "@/routes/routes"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

interface Props {
  rol: Roles
}

export const RolGuard = ({ rol }: Props) => {
  const userState = useSelector((store: AppStore) => store.user)
  return userState.rol === rol ? (
    <Outlet />
  ) : (
    <Navigate
      replace
      to={PrivateRoutes.PRIVATE}
    />
  )
}

export default RolGuard
