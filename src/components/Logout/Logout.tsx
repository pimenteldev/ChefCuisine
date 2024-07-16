import { clearLocalStorage } from "@/helpers/localStorage"
import { UserKey, resetUser } from "@/redux/slices/userSlice"
import { AppStore } from "@/redux/store"
import { PublicRoutes } from "@/routes/routes"
import { Avatar, Box, Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Logout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userState = useSelector((store: AppStore) => store.user)

  const handleLogout = () => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate(`/${PublicRoutes.LOGIN}`)
  }

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Avatar
        src={userState.userPhoto}
        sx={{
          height: 30,
          width: 30,
          display: { xs: "none", sm: "block" },
          mr: 1,
        }}
      />
      <Typography
        color="secondary"
        variant="overline"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        {userState.userName}
      </Typography>
      <Button
        color="secondary"
        size="small"
        variant="outlined"
        sx={{ ml: 1 }}
        onClick={handleLogout}
      >
        Salir
      </Button>
    </Box>
  )
}

export default Logout
