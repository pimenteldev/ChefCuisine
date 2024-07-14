import { CustomDialog } from "@/components"
import { AddTable, useTablesViewContext } from "@/pages"
import { ModifyTable } from "../ModifyTable"

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
