import { PrivateRoutes } from "@/routes/routes"

export const menuItemsAdmin = [
  {
    title: "Inicio",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DASHBOARD}`,
  },
  {
    title: "Productos",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.PRODUCTOS}`,
  },
  {
    title: "Mesas",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MESAS}`,
  },
  {
    title: "Pedidos",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.PEDIDOS}`,
  },
  {
    title: "Reportes",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.REPORTES}`,
  },
  {
    title: "Inventario",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.INVENTARIO}`,
  },
  {
    title: "Empresa",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.EMPRESA}`,
  },
  {
    title: "Empleados",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.EMPLEADOS}`,
  },
  {
    title: "Proveedores",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.PROVEEDORES}`,
  },
]

export const menuItemsUser = [
  {
    title: "Inicio",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DASHBOARD}`,
  },
  {
    title: "HomeUser",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.HOMEUSER}`,
  },
  {
    title: "Productos",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.PRODUCTOS}`,
  },
  {
    title: "Mesas",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MESAS}`,
  },
  {
    title: "Pedidos",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.PEDIDOS}`,
  },
  {
    title: "Reportes",
    path: "/reportes",
  },
  {
    title: "Inventario",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.INVENTARIO}`,
  },
  {
    title: "Empresa",
    path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.EMPRESA}`,
  },
  {
    title: "Personal",
    path: "/personal",
  },
  {
    title: "Proveedores",
    path: "/proveedores",
  },
]
