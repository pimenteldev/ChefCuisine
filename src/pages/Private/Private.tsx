import {PrivateRoutes} from '@/routes'
import {Navigate, Route} from 'react-router-dom'
import {RoutesWithNotFound} from '@/helpers'
import {lazy} from 'react'

const Dashboard = lazy(() => import('./Dashboard/Dashboard'))
const Products = lazy(() => import('./Products/Products'))

function Private() {
  return (
    <RoutesWithNotFound>
      <Route
        path="/"
        element={<Navigate to={PrivateRoutes.DASHBOARD} />}
      />
      <Route
        path={PrivateRoutes.DASHBOARD}
        element={<Dashboard />}
      />

      <Route
        path={PrivateRoutes.PRODUCTOS}
        element={<Products />}
      />
    </RoutesWithNotFound>
  )
}

export default Private
