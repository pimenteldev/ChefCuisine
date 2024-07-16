import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar"
import { clearLocalStorage } from "@/helpers/localStorage"
import { BackendUser } from "@/models/user"
import { UserKey, createUser, resetUser } from "@/redux/slices/userSlice"
import { AppStore } from "@/redux/store"
import { PrivateRoutes, PublicRoutes } from "@/routes/routes"
import { AlertColor } from "@mui/material"
import { useEffect } from "react"
import { Resolver, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FormValues } from "../models/loginform"
import { authService } from "../services/auth"

function useLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSnackBar = (message: string, severity: AlertColor) => {
    snackbarOpenSubject$.setSubject = {
      open: true,
      message: message,
      severity: severity,
    }
  }

  const userState = useSelector((store: AppStore) => store.user)

  useEffect(() => {
    if (userState.userName) {
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true })
    }
  }, [userState])

  const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.user_id || values.user_psw ? values : {},
      errors: !values.user_id
        ? {
            user_id: {
              type: "required",
              message: "El campo Usuario es Requerido",
            },
          }
        : !values.user_psw
        ? {
            user_psw: {
              type: "required",
              message: "El campo Contraseña es Requerido",
            },
          }
        : {},
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange", resolver })

  useEffect(() => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate(`/${PublicRoutes.LOGIN}`)
  }, [])

  const onSubmit = handleSubmit((data: Partial<BackendUser>) => {
    try {
      authService(data).then((response) => {
        response.userId
          ? handleSnackBar(`Bienvenido al Sistema Phoenix`, "success")
          : handleSnackBar(`Usuario o Contraseña Inválidos`, "error")
        dispatch(createUser(response))
      })
    } catch (error) {
      console.log(error)
      handleSnackBar("Ups, algo ha salió mal. Intenta Nuevamente", "error")
    }
  })

  return { register, errors, onSubmit }
}

export default useLogin
