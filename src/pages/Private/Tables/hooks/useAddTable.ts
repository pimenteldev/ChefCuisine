import { dialogCloseSubject$ } from "@/components/CustomDialog/CustomDialog.component"
import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar"
import { AlertColor } from "@mui/material"
import { useForm } from "react-hook-form"
import addNewTable from "../services/addNewTable"
import useGetAllTables from "./useGetAllTables"

type FormValues = {
  table_name: string
  table_status: number
}

function useAddTable() {
  const { callToEndPointsAndDispatchs } = useGetAllTables()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>()

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

  const onSubmit = async (data: FormValues) => {
    await addNewTable(JSON.stringify(data))
      .then((json) => {
        if (json.created === true) {
          handleSnackBar(`Has registrado una Nueva Mesa`, "success")
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

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    handleClick,
  }
}

export default useAddTable
