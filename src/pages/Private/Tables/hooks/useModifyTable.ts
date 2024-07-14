import { dialogCloseSubject$ } from "@/components/CustomDialog/CustomDialog.component"
import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar.component"
import { Table } from "@/models"
import {
  modifyTable,
  removeProduct,
  useGetAllTables,
  useTablesViewContext,
} from "@/pages"
import { AlertColor } from "@mui/material"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

function useModifyTable() {
  const { dialog } = useTablesViewContext()
  const { table } = dialog

  const { callToEndPointsAndDispatchs } = useGetAllTables()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Table>({
    defaultValues: table,
  })

  useEffect(() => {
    setValue("table_name", table.table_name)
    setValue("table_status", table.table_status)
  }, [table])

  const handleClick = () => {
    dialogCloseSubject$.setSubject = false
  }

  const handleSnackBar = (message: string, severity: AlertColor) => {
    snackbarOpenSubject$.setSubject = {
      open: true,
      message: message,
      severity: severity,
    }
  }

  const onSubmit = async (data: Table) => {
    await modifyTable(JSON.stringify(data))
      .then((json) => {
        if (json.modify === true) {
          handleSnackBar(`Has Modificado una Mesa`, "success")
          handleClick()
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

  const handleClickDelete = async (
    product_id: string,
    product_photo: string
  ) => {
    await removeProduct(product_id, product_photo)
      .then((json) => {
        if (json.delete === true) {
          handleSnackBar(`Has Eliminado un Producto`, "success")
          handleClick()
          callToEndPointsAndDispatchs()
        } else {
          handleSnackBar(`${json.message}`, "error")
        }
      })
      .catch((err) => {
        handleSnackBar(`Ups, algo salió mal.`, "error")
        console.error(err)
      })
  }

  return {
    errors,
    handleClick,
    handleSubmit,
    handleClickDelete,
    onSubmit,
    register,
    table,
  }
}

export default useModifyTable