import { Container, Typography } from "@mui/material"
import DialogContainerTables from "./components/DialogContainerTables/DialogContainerTables"
import FabButtonTables from "./components/FabButtonTables/FabButtonTables"
import TablesList from "./components/TablesList/TablesList"
import { TablesProvider } from "./contexts/TablesView"

export interface TablesInterface {}

const Tables: React.FC<TablesInterface> = () => {
  return (
    <TablesProvider>
      <Container sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            mb: 0,
          }}
        >
          Mesas
        </Typography>
        <TablesList />

        <FabButtonTables />
        <DialogContainerTables />
      </Container>
    </TablesProvider>
  )
}

export default Tables
