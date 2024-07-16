import AddIcon from "@mui/icons-material/Add"
import { Fab } from "@mui/material"
import { dialogOpenSubject$ } from "@/components/CustomDialog/CustomDialog.component"
import { useTablesViewContext } from "../../contexts/TablesView"

const FabButtonTables = () => {
  const { setDialog } = useTablesViewContext()
  const handleClick = () => {
    setDialog({ action: "add" })
    dialogOpenSubject$.setSubject = true
  }

  return (
    <Fab
      size="medium"
      color="primary"
      aria-label="Agregar"
      sx={{
        position: "fixed",
        right: 20,
        bottom: 20,
      }}
      onClick={handleClick}
    >
      <AddIcon />
    </Fab>
  )
}

export default FabButtonTables
