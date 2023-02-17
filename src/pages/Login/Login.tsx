import {snackbarOpenSubject$} from '@/components/CustomSnackBar/CustomSnackBar.component'
import {APP_NAME} from '@/constants'
import {Avatar, Box, Button, CardContent, Container, Divider, TextField, Typography} from '@mui/material'
import {useLogin} from './hooks'
import logo from '/icon.png'

const Login = () => {
  const {register, errors, onSubmit} = useLogin()
  const handleSnackBar = () => {
    snackbarOpenSubject$.setSubject = {
      open: true,
      message: '',
      severity: 'error',
    }
  }
  return (
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%',
      }}
    >
      <Container maxWidth="xs">
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt="LogoPhoenixAPP"
              src={logo}
              sx={{
                backgroundColor: 'primary.main',
                height: 125,
                width: 125,
                boxSizing: 'content-box',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </Box>
          <Typography
            align="center"
            variant="h3"
            color="primary"
            sx={{
              fontWeight: 900,
            }}
          >
            {APP_NAME}
          </Typography>
          <Divider
            sx={{
              borderColor: 'primary.main',
            }}
          />
          <Typography
            color="GrayText"
            variant="body1"
            align="center"
            onClick={() => handleSnackBar()}
            sx={{
              fontWeight: 600,
            }}
          >
            Sistema de Restaurante
          </Typography>
        </CardContent>
        <form onSubmit={onSubmit}>
          <>
            <TextField
              fullWidth
              label="Usuario"
              margin="normal"
              type="text"
              size="medium"
              variant="outlined"
              {...register('user_id')}
            />
            {errors.user_id && (
              <Typography
                variant="body2"
                color={'error'}
                align="center"
              >
                {errors.user_id.message}
              </Typography>
            )}
            <TextField
              fullWidth
              label="Contraseña"
              margin="normal"
              type="password"
              size="medium"
              variant="outlined"
              {...register('user_psw')}
            />
            {errors.user_psw && (
              <Typography
                variant="body2"
                color={'error'}
                align="center"
              >
                {errors.user_psw.message}
              </Typography>
            )}
          </>
          <Box sx={{py: 2}}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Ingresar
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  )
}

export default Login
