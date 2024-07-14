import { PrivateRoutes } from "@/routes"
import { Navigate, Route } from "react-router-dom"
import { lazy } from "react"
import RoutesWithNotFound from "@/helpers/RoutesWithNotFound.utility"

const Company = lazy(() => import("./Company/Company"))
const Dashboard = lazy(() => import("./Dashboard/Dashboard"))
const Employees = lazy(() => import("./Employees/Employees"))
const Inventory = lazy(() => import("./Inventory/Inventory"))
const Orders = lazy(() => import("./Orders/Orders"))
const Products = lazy(() => import("./Products/Products"))
const Reports = lazy(() => import("./Reports/Reports"))
const Suppliers = lazy(() => import("./Suppliers/Suppliers"))
const Tables = lazy(() => import("./Tables/Tables"))

function Private() {
  return (
    <RoutesWithNotFound>
      <Route
        path="/"
        element={<Navigate to={PrivateRoutes.DASHBOARD} />}
      />
      <Route
        path={PrivateRoutes.EMPRESA}
        element={<Company />}
      />
      <Route
        path={PrivateRoutes.DASHBOARD}
        element={<Dashboard />}
      />
      <Route
        path={PrivateRoutes.EMPLEADOS}
        element={<Employees />}
      />
      <Route
        path={PrivateRoutes.INVENTARIO}
        element={<Inventory />}
      />
      <Route
        path={PrivateRoutes.PEDIDOS}
        element={<Orders />}
      />
      <Route
        path={PrivateRoutes.PRODUCTOS}
        element={<Products />}
      />
      <Route
        path={PrivateRoutes.REPORTES}
        element={<Reports />}
      />
      <Route
        path={PrivateRoutes.PROVEEDORES}
        element={<Suppliers />}
      />
      <Route
        path={PrivateRoutes.MESAS}
        element={<Tables />}
      />
    </RoutesWithNotFound>
  )
}

export default Private
