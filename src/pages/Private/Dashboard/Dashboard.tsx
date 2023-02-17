import {Container, Typography} from '@mui/material'

function Dashboard() {
  return (
    <>
      <Container>
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            mb: 0,
          }}
        >
          Bienvenido,
        </Typography>

        <Typography variant="h6">Controla y administra tu negocio desde aquí</Typography>
      </Container>
    </>
  )
}

export default Dashboard
