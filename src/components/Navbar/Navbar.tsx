import { APP_NAME } from "@/constants/utilitys"
import { cartOpenSubject$ } from "@/pages/Private/Orders/components/Cart/Cart"
import useSelectors from "@/pages/Private/Orders/hooks/useSelectors"
import { PrivateRoutes } from "@/routes/routes"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import {
  AppBar,
  Avatar,
  Badge,
  BadgeProps,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material"
import React from "react"
import { useLocation } from "react-router-dom"
import Logout from "../Logout/Logout"
import { sidebarOpenSubject$ } from "../Sidebar/Sidebar"
import logo from "/icon.png"
import { Menu } from "./Menu/Menu"

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))

const Navbar = () => {
  const {
    products,
    isTableSelected,
    isPersonalSelected,
    countProductsInOrder,
  } = useSelectors()

  const handleClick = () => {
    sidebarOpenSubject$.setSubject = true
  }
  const handleClickCart = () => {
    cartOpenSubject$.setSubject = true
  }

  const location = useLocation()
  const path = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.PEDIDOS}`

  return (
    <AppBar
      position="fixed"
      color="primary"
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="secondary"
          aria-label="Menu"
          sx={{
            mr: { xs: 0, sm: 1 },
          }}
          onClick={handleClick}
        >
          <Menu />
        </IconButton>

        <Avatar
          src={logo}
          sx={{
            height: 30,
            width: 30,
            display: { xs: "none", sm: "block" },
            mr: 1,
            borderRadius: 0,
          }}
        />

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 900 }}
        >
          {APP_NAME}
        </Typography>
        {products.length >= 1 &&
          isTableSelected === true &&
          isPersonalSelected === true &&
          location.pathname === path && (
            <div onClick={handleClickCart}>
              <IconButton
                size="medium"
                edge="start"
                color="secondary"
                aria-label="Menu"
                sx={{
                  mr: "-5px",
                }}
              >
                <StyledBadge
                  badgeContent={countProductsInOrder}
                  color="secondary"
                >
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              <IconButton aria-label="cart"></IconButton>
            </div>
          )}

        <Logout />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
