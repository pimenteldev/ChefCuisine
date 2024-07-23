import { dialogCloseSubject$ } from "@/components/CustomDialog/CustomDialog"
import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar"
import { AlertColor } from "@mui/material"
import removeTable from "../services/removeTable"
import useGetAllTables from "./useGetAllTables"

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
