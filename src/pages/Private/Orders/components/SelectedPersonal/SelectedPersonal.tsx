import { baseUrl } from "@/constants/utilitys"
import {
  Container,
  Alert,
  Card,
  CardActionArea,
  CardHeader,
  Avatar,
  CardMedia,
  Grid,
} from "@mui/material"
import useInitialGetData from "../../hooks/useSelectors"
import { useDispatch } from "react-redux"
import { addPersonalSelect } from "@/redux/slices/orderSlice"

const SelectedPersonal = () => {
  const { personal, role } = useInitialGetData()

  const dispatch = useDispatch()

  const handleSelectPersonal = (
    personal_document: string,
    personal_name: string
  ) => {
    dispatch(addPersonalSelect({ personal_document, personal_name }))
  }

  return (
    <Container sx={{ mb: 4 }}>
      <Alert
        variant="standard"
        severity={"info"}
        sx={{
          px: 1,
          py: 0,
          mt: 1,
          mb: 2,
        }}
      >
        Selecciona un Mesonero
      </Alert>
      <Grid
        container
        columns={12}
      >
        {personal?.length === 0 && <>No existen Mesoneros en el Sistema</>}

        {personal?.map(
          ({
            personal_document,
            personal_name,
            personal_photo,
            personal_alias,
            personal_role,
          }) => {
            const colorRole = [...role].filter(
              (rol) => personal_role === rol.role_id
            )

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{
                  p: "5px",
                }}
                key={personal_document}
              >
                <Card
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <CardActionArea
                    onClick={() =>
                      handleSelectPersonal(personal_document, personal_name)
                    }
                  >
                    <CardHeader
                      sx={{
                        height: 60,
                        backgroundColor: "var(--secondary-color)",
                        padding: "10px",
                      }}
                      avatar={<Avatar src={baseUrl + personal_photo} />}
                      title={personal_name}
                      subheader={personal_alias}
                    />

                    <CardMedia
                      component="img"
                      height="194"
                      image={baseUrl + personal_photo}
                      alt={personal_alias}
                      style={{ objectFit: "cover" }}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            )
          }
        )}
      </Grid>
    </Container>
  )
}

export default SelectedPersonal
