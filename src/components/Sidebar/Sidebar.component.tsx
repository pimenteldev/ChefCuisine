import {menuItemsAdmin, menuItemsUser} from '@/data'
import {Roles, SubjectManager} from '@/models'
import {AppStore} from '@/redux/store'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowRightIcon from '@mui/icons-material/ArrowCircleRight'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Link,
  List,
  ListItemIcon,
  Paper,
  Typography,
} from '@mui/material'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Subscription} from 'rxjs'

export const sidebarOpenSubject$ = new SubjectManager<boolean>()
export const sidebarCloseSubject$ = new SubjectManager<boolean>()

function Sidebar() {
  const userState = useSelector((store: AppStore) => store.user)
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  let openSubject$ = new Subscription()
  let closeSubject$ = new Subscription()

  useEffect(() => {
    openSubject$ = sidebarOpenSubject$.getSubject.subscribe(() => handleClickOpen())
    closeSubject$ = sidebarCloseSubject$.getSubject.subscribe(() => handleClose())
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleExit = () => {
    sidebarCloseSubject$.setSubject = false
  }

  const handleNavigate = (itemPath: string) => {
    handleClose()
    setTimeout(() => {
      navigate(itemPath, {replace: true})
    }, 400)
  }

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box>
        <Box sx={{p: 1}}>
          <Button
            onClick={() => handleExit()}
            size="medium"
            color="primary"
            variant="outlined"
          >
            <ArrowBackIcon fontSize="small" />
          </Button>
        </Box>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 0,
            textAlign: 'center',
          }}
        >
          <Container
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar
              src={userState.userPhoto}
              sx={{
                height: 100,
                width: 100,
                mb: 1,
              }}
            />
          </Container>
          <Typography
            variant="overline"
            gutterBottom
          >
            {userState.userName}
          </Typography>
        </Paper>
      </Box>

      <Box
        sx={{
          px: 2,
        }}
      >
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {userState.rol === Roles.ADMIN &&
            menuItemsAdmin.map((item) => (
              <Link
                key={item.path}
                color="primary"
                underline="hover"
                onClick={() => handleNavigate(item.path)}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <ListItemIcon>
                  <ArrowRightIcon color="primary" />
                  {item.title}
                </ListItemIcon>
              </Link>
            ))}
          {userState.rol === Roles.USER &&
            menuItemsUser.map((item) => (
              <Link
                key={item.path}
                color="primary"
                underline="hover"
                onClick={() => handleNavigate(item.path)}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <ListItemIcon>
                  <ArrowRightIcon color="primary" />
                  {item.title}
                </ListItemIcon>
              </Link>
            ))}
        </List>
      </Box>

      <Divider />
      <Box
        sx={{
          px: 2,
          py: 3,
          textAlign: 'center',
        }}
      >
        <Typography
          color="grey.700"
          variant="subtitle2"
        >
          Opciones
        </Typography>
        <Typography
          color="grey.500"
          variant="body2"
        >
          Phoenix APP
        </Typography>
        <Box
          sx={{
            display: 'flex',
            mt: 2,
            mx: 'auto',
            width: '160px',
            '& img': {
              width: '100%',
            },
          }}
        ></Box>
      </Box>
    </Box>
  )

  return (
    <Drawer
      anchor="left"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          width: 280,
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}

export default Sidebar
