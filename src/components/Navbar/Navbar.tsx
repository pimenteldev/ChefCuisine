import { APP_NAME } from "@/constants/utilitys"
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
import Logout from "../Logout/Logout"
import { sidebarOpenSubject$ } from "../Sidebar/Sidebar"
import { Menu } from "./styled-component/Menu"
import logo from "/icon.png"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { cartOpenSubject$ } from "@/pages/Private/Orders/components/Cart/Cart"
import { useSelector } from "react-redux"
import { AppStore } from "@/redux/store"
import { useLocation } from "react-router-dom"

export interface NavbarInterface {}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))

const Navbar: React.FC<NavbarInterface> = () => {
  const currentOrder = useSelector((store: AppStore) => store.currentOrder)

  const handleClick = () => {
    sidebarOpenSubject$.setSubject = true
  }
  const handleClickCart = () => {
    cartOpenSubject$.setSubject = true
  }

  const location = useLocation()

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
        {currentOrder.products.length >= 1 &&
          currentOrder.isTableSelected === true &&
          currentOrder.isPersonalSelected === true &&
          location.pathname === "/private/pedidos" && (
            <div onClick={handleClickCart}>
              <IconButton
                size="medium"
                edge="start"
                color="secondary"
                aria-label="Menu"
                sx={{
                  mr: { xs: 0, sm: 1 },
                }}
              >
                <StyledBadge
                  badgeContent={currentOrder.products.length}
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
