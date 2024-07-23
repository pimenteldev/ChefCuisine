import {
  Container,
  Alert,
  Card,
  CardActionArea,
  CardHeader,
  Avatar,
  Typography,
  CardMedia,
  Grid,
} from "@mui/material"
import useInitialGetData from "../../hooks/useSelectors"
import StyledBadge from "@/components/StyledBadge/StyledBadge"
import { useDispatch } from "react-redux"
import {
  addTableSelect,
  addOrderToCurrentOrder,
} from "@/redux/slices/orderSlice"
import { Table } from "@/models/tables"
import { Order } from "@/models/orders"

const SelectedTable = () => {
  const { tables, orders, personal } = useInitialGetData()

  const dispatch = useDispatch()

  const handleAddTableSelect = (table: Table, order: Order) => {
    const { table_id, table_name, table_active } = table

    if (table_active) {
      dispatch(addOrderToCurrentOrder(order))
    } else {
      dispatch(addTableSelect({ table_id, table_name }))
    }
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
        Selecciona una Mesa
      </Alert>
      <Grid
        container
        columns={12}
      >
        {tables?.length === 0 && <>No existen Mesas en el Sistema</>}

        {tables?.map((table) => {
          const { table_id, table_name, table_active } = table
          const orderActive = orders.filter(
            (order) => order.order_table_id === table_id
          )

          const personalInfo = personal.filter(
            (person) =>
              orderActive[0]?.order_personal_document ===
              person.personal_document
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
              key={table_id}
            >
              <Card
                style={{
                  cursor: "pointer",
                }}
              >
                <CardActionArea
                  onClick={() => handleAddTableSelect(table, orderActive[0])}
                >
                  <CardHeader
                    sx={{
                      height: 60,
                      padding: "10px",
                      backgroundColor: "var(--secondary-color)",
                    }}
                    avatar={
                      personalInfo[0]?.personal_photo ? (
                        <StyledBadge>
                          <Avatar src="/staff.svg" />
                        </StyledBadge>
                      ) : (
                        <Typography
                          variant="inherit"
                          fontWeight="bold"
                        >
                          Mesa Disponible
                        </Typography>
                      )
                    }
                    title={
                      <Typography
                        component="span"
                        fontWeight="bold"
                      >
                        {personalInfo[0]?.personal_name}
                      </Typography>
                    }
                    subheader={
                      personalInfo[0]?.personal_name && (
                        <Typography
                          variant="inherit"
                          fontWeight="bold"
                        >
                          Cuenta Activa
                        </Typography>
                      )
                    }
                  />

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: table_active
                        ? "var(--primary-color)"
                        : "#ffffff",
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
                      color={
                        table_active
                          ? "var(--secondary-color)"
                          : "var(--primary-color)"
                      }
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
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default SelectedTable
