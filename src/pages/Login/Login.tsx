import CustomInput from "@/components/CustomInput/CustomInput"
import { Button } from "@mui/material"
import useLogin from "./hooks/useLogin"
import logo from "/icon.png"
import { APP_NAME, APP_SUBNAME } from "@/constants/utilitys"
import "./styles/login.css"

const Login = () => {
  const { register, errors, onSubmit } = useLogin()

  return (
    <div className="login-container">
      <div className="login-card">
        <figure>
          <img
            src={logo}
            alt="LogoPhoenixAPP"
            role="img"
          />
        </figure>
        <div className="login-card-title">
          <h1>{APP_NAME}</h1>
          <h4>{APP_SUBNAME}</h4>
        </div>
        <form
          className="login-form"
          onSubmit={onSubmit}
        >
          <CustomInput
            register={register}
            name="user_id"
            errors={errors}
            type="text"
            required={true}
            label="Usuario"
            disabled={false}
          />
          <CustomInput
            register={register}
            name="user_psw"
            errors={errors}
            type="password"
            required={true}
            label="Contraseña"
            disabled={false}
          />
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            role="button"
          >
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
