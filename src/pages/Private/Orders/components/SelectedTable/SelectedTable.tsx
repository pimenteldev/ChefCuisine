import { TablesApi } from "@/models"
import { Alert, Container, Typography } from "@mui/material"
import {
  CardTableBase,
  CardTableFigure,
  CardTableFigureImg,
  CardTableGrid,
  CardTableLayout,
  CardTableName,
  CardTableStatusOff,
  CardTableStatusOn,
} from "../styled-components"
import mesa from "/mesa.jpg"

interface Props {
  data: TablesApi
}

const SelectedTable = (props: Props) => {
  const { data } = props
  const { tables } = data

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
        {tables &&
          tables.map((table) => (
            <CardTableLayout>
              <CardTableBase>
                <CardTableName>{table.table_name}</CardTableName>
                <CardTableFigure>
                  <CardTableFigureImg
                    src={mesa}
                    alt="Mesa"
                    loading="lazy"
                  />
                </CardTableFigure>
              </CardTableBase>
            </CardTableLayout>
          ))}
      </CardTableGrid>
    </Container>
  )
}

export default SelectedTable
