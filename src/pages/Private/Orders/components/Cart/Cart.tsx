import { SubjectManager } from "@/models/subjectManager"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  SwipeableDrawer,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { Subscription } from "rxjs"
import CartContent from "../CartContent/CartContent"

export const cartOpenSubject$ = new SubjectManager<boolean>()
export const cartCloseSubject$ = new SubjectManager<boolean>()

function Cart() {
  const [open, setOpen] = useState(false)

  let openSubject$ = new Subscription()
  let closeSubject$ = new Subscription()

  useEffect(() => {
    openSubject$ = cartOpenSubject$.getSubject.subscribe(() =>
      handleClickOpen()
    )
    closeSubject$ = cartCloseSubject$.getSubject.subscribe(() => handleClose())
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleExit = () => {
    cartCloseSubject$.setSubject = false
  }

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box>
        <Box sx={{ p: 1 }}>
          <Button
            onClick={() => handleExit()}
            size="medium"
            color="primary"
            variant="outlined"
          >
            <ArrowForwardIcon fontSize="small" />
          </Button>
        </Box>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 0,
            textAlign: "center",
          }}
        >
          <Container
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ShoppingCartIcon fontSize="large" />
          </Container>
          <Typography
            variant="overline"
            gutterBottom
          >
            Pedido
          </Typography>
        </Paper>
      </Box>

      <Box
        sx={{
          px: 2,
        }}
      >
        <CartContent />
      </Box>

      <Divider />
      <Box
        sx={{
          px: 2,
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography
          color="grey.500"
          variant="body2"
        >
          Phoenix APP
        </Typography>
        <Box
          sx={{
            display: "flex",
            mt: 2,
            mx: "auto",
            width: "160px",
            "& img": {
              width: "100%",
            },
          }}
        ></Box>
      </Box>
    </Box>
  )

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          width: 280,
        },
      }}
      variant="temporary"
      onClose={() => handleExit()}
      onOpen={() => handleExit()}
    >
      {content}
    </SwipeableDrawer>
  )
}

export default Cart
