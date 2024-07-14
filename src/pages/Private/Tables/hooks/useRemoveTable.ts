import { dialogCloseSubject$ } from "@/components/CustomDialog/CustomDialog.component"
import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar.component"
import { removeTable, useGetAllTables } from "@/pages"
import { AlertColor } from "@mui/material"

function useRemoveTable() {
  const { callToEndPointsAndDispatchs } = useGetAllTables()

  const handleSnackBar = (message: string, severity: AlertColor) => {
    snackbarOpenSubject$.setSubject = {
      open: true,
      message: message,
      severity: severity,
    }
  }

  const handleClickRemove = async (table_id: number) => {
    dialogCloseSubject$.setSubject = false

    await removeTable(table_id)
      .then((json) => {
        if (json.delete === true) {
          handleSnackBar(`Has Eliminado la Mesa`, "success")
          callToEndPointsAndDispatchs()
        } else {
          handleSnackBar(`${json.message}`, "error")
        }
      })
      .catch((err: string) => {
        handleSnackBar(`Ups, algo salió mal.`, "error")
        console.error(err)
      })
  }

  return {
    handleClickRemove,
  }
}

export default useRemoveTable
