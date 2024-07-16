import { baseUrl } from "@/constants"
import { useInitialGetData } from "@/pages/Private/Orders"
import { CardTableGrid } from "@/pages/Private/Tables"
import {
  Alert,
  Avatar,
  Badge,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Container,
  styled,
  Typography,
} from "@mui/material"

interface Props {
  handleSelectPersonal: (
    personalSelectDocument: string,
    personalSelectName: string
  ) => void
}

const SelectedPersonal: React.FC<Props> = (props) => {
  const { handleSelectPersonal } = props
  const { personal, role } = useInitialGetData()

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
      <CardTableGrid>
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
              <Card
                sx={{
                  maxWidth: 345,
                  position: "relative",
                  cursor: "pointer",
                }}
                key={personal_document}
              >
                <CardActionArea
                  onClick={() =>
                    handleSelectPersonal(personal_document, personal_name)
                  }
                >
                  <CardHeader
                    sx={{
                      height: 60,
                      backgroundColor: "#f7f7f7",
                      padding: "10px",
                    }}
                    avatar={<Avatar src={baseUrl + personal_photo} />}
                    title={personal_name}
                    subheader={personal_alias}
                  />
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="194"
                      image={baseUrl + personal_photo}
                      alt={personal_alias}
                    />
                  </div>
                </CardActionArea>
              </Card>
            )
          }
        )}
      </CardTableGrid>
    </Container>
  )
}

export default SelectedPersonal
