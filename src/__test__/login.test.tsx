import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import Login from "@/pages/Login/Login"
import store from "@/redux/store"

const LoginMock = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  )
}

jest.mock("fetch")

describe("Login", () => {
  afterEach(cleanup)

  beforeAll(() => {
    render(<LoginMock />)
  })

  test("Should two input exist at the screen", async () => {
    const inputUser = screen.getByLabelText(/usuario/i)
    const inputPass = screen.getByLabelText(/contraseña/i)
    const btnIngresar = screen.getByRole("button", { name: /Ingresar/i })

    fireEvent.change(inputUser, { target: { value: "admin" } })
    fireEvent.change(inputPass, { target: { value: "1234" } })
    fireEvent.click(btnIngresar)

    expect(fetch).toHaveBeenCalled()
  })
})
