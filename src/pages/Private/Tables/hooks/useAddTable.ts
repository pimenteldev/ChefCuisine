import { useState } from "react"
import { useDispatch } from "react-redux"
import { getAllTables } from "../services"
import { setDataInTable } from "@/redux/slices/tables"
import { useGetAllTables, addNewTable } from "@/pages"
import { dialogCloseSubject$ } from "@/components/CustomDialog/CustomDialog.component"
import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar.component"
import { useForm } from "react-hook-form"
import { AlertColor } from "@mui/material"

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
