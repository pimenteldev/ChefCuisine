import {Box, Button, Container, Typography} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {PrivateRoutes} from '@/routes'
export interface NotFoundInterface {}

const NotFound: React.FC<NotFoundInterface> = () => {
  const navigate = useNavigate()

  return (
    <NotFoundStyle>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 5,
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              align="center"
              color="textPrimary"
              sx={{
                color: 'primary.main',
              }}
              variant="h1"
            >
              404
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              variant="h2"
            >
              Esta Página no existe dentro del Sistema
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              variant="subtitle2"
            >
              Usted ha ingresado a una Ruta que no existe dentro del sistema, Verifíca e intenta usar la Navegación.
            </Typography>

            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{mt: 3}}
              variant="contained"
              onClick={() => navigate(`/${PrivateRoutes.PRIVATE}`, {replace: true})}
            >
              Ir al Inicio
            </Button>
          </Box>
        </Container>
      </Box>
    </NotFoundStyle>
  )
}

export const NotFoundStyle = styled.div``

export default NotFound
