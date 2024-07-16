import { CardTableGrid } from "@/pages/Private/Tables/styled-components/CardTable"
import {
  Container,
  Alert,
  Card,
  CardActionArea,
  CardHeader,
  Avatar,
  Typography,
  CardMedia,
} from "@mui/material"
import useInitialGetData from "../../hooks/useInitialGetData"
import StyledBadge from "@/components/StyledBadge/StyledBadge"

interface Props {
  handleSelectTable: (table_id: number, table_name: string) => void
}

const SelectedTable: React.FC<Props> = (props) => {
  const { handleSelectTable } = props
  const { tables, orders, personal } = useInitialGetData()

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
        Selecciona una Mesa
      </Alert>
      <CardTableGrid>
        {tables?.length === 0 && <>No existen Mesas en el Sistema</>}

        {tables?.map(({ table_id, table_name, table_active }) => {
          const orderActive = [...orders].filter(
            (order) => order.order_table_id === table_id
          )

          const personalInfo = [...personal].filter(
            (person) =>
              orderActive[0]?.order_personal_document ===
              person.personal_document
          )

          return (
            <Card
              sx={{
                maxWidth: 345,
                position: "relative",
                cursor: "pointer",
              }}
              key={table_id}
            >
              <CardActionArea
                onClick={() => handleSelectTable(table_id, table_name)}
              >
                <CardHeader
                  sx={{
                    height: 60,
                    backgroundColor: "#f7f7f7",
                    padding: "10px",
                  }}
                  avatar={
                    personalInfo[0]?.personal_photo ? (
                      <StyledBadge>
                        <Avatar src="/staff.svg" />
                      </StyledBadge>
                    ) : (
                      <Typography
                        variant="overline"
                        color="text.secondary"
                      >
                        Mesa Disponible
                      </Typography>
                    )
                  }
                  title={personalInfo[0]?.personal_name}
                  subheader={personalInfo[0]?.personal_name && "Cuenta Activa"}
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: table_active ? "#10b981" : "#ffffff",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="194"
                    image="/mesa.jpg"
                    alt={table_name}
                    sx={{
                      position: "relative",
                      opacity: 0.3,
                      zIndex: 9,
                    }}
                  />

                  <Typography
                    variant="h5"
                    color={table_active ? "white" : "#4d4d4d"}
                    sx={{
                      position: "absolute",
                      opacity: "1",
                      fontWeight: "bold",
                      zIndex: 99,
                    }}
                  >
                    {table_name}
                  </Typography>
                </div>
              </CardActionArea>
            </Card>
          )
        })}
      </CardTableGrid>
    </Container>
  )
}

export default SelectedTable
