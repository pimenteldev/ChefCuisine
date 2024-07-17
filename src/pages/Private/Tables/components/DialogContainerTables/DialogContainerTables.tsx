import CustomDialog from "@/components/CustomDialog/CustomDialog.component"
import { useTablesViewContext } from "../../contexts/TablesView"
import AddTable from "../AddTable/AddTable"
import ModifyTable from "../ModifyTable/ModifyTable"

function DialogContainerTables() {
  const { dialog } = useTablesViewContext()
  const { action } = dialog
  return (
    <CustomDialog>
      {dialog && action === "add" ? (
        <AddTable />
      ) : action === "modify" ? (
        <ModifyTable />
      ) : (
        <>remove</>
      )}
    </CustomDialog>
  )
}

export default DialogContainerTables
