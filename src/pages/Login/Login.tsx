import { CustomInput } from "@/components"
import { Button } from "@mui/material"
import { LoginCardFigure } from "./components/LoginCardFigure"
import { LoginCardTitle } from "./components/LoginCardTitle"
import { useLogin } from "./hooks"
import { LoginCard, LoginContainer, LoginForm } from "./styled-components"

const Login = () => {
  const { register, errors, onSubmit } = useLogin()

  return (
    <LoginContainer>
      <LoginCard>
        <LoginCardFigure />
        <LoginCardTitle />
      </LoginCard>
      <LoginForm onSubmit={onSubmit}>
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
      </LoginForm>
    </LoginContainer>
  )
}

export default Login
