import { Suspense, lazy } from "react"
import { Provider } from "react-redux"
import { Route } from "react-router"
import { BrowserRouter, Navigate } from "react-router-dom"
import { CustomSnackBar, Navbar, Sidebar, Spinner } from "./components"
import { AuthGuard, RolGuard } from "./guards"
import { RoutesWithNotFound } from "./helpers"
import { Roles } from "./models"
import { HomeUser } from "./pages"
import store from "./redux/store"
import { PrivateRoutes, PublicRoutes } from "./routes"
import { LayoutContainer } from "./styled-components"

const Login = lazy(() => import("./pages/Login/Login"))
const Private = lazy(() => import("./pages/Private/Private"))

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <LayoutContainer>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route
                path="/"
                element={<Navigate to={PrivateRoutes.PRIVATE} />}
              />

              <Route
                path={PublicRoutes.LOGIN}
                element={<Login />}
              />

              <Route element={<AuthGuard privateValidation={true} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={
                    <>
                      <Navbar />
                      <Sidebar />
                      <Private />
                    </>
                  }
                />
              </Route>
              <Route element={<RolGuard rol={Roles.ADMIN} />}>
                <Route
                  path={`${PrivateRoutes.DASHBOARD}`}
                  element={
                    <>
                      <Navbar />
                      <Sidebar />
                      <Private />
                    </>
                  }
                />
              </Route>
              <Route element={<RolGuard rol={Roles.USER} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.HOMEUSER}`}
                  element={
                    <>
                      <Navbar />
                      <Sidebar />
                      <HomeUser />
                    </>
                  }
                />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
          <CustomSnackBar></CustomSnackBar>
        </LayoutContainer>
      </Provider>
    </Suspense>
  )
}

export default App
