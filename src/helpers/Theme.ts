import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    action: {
      active: "#474747",
      focus: "rgba(55, 65, 81, 0.12)",
      hover: "rgba(55, 65, 81, 0.04)",
      selected: "rgba(55, 65, 81, 0.08)",
      disabledBackground: "rgba(55, 65, 81, 0.12)",
      disabled: "rgba(55, 65, 81, 0.26)",
    },

    divider: "#1f618daa",
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    primary: {
      main: "#1f618d",
      light: "#1f618daa",
      dark: "#1f618d",
      contrastText: "#ffc300",
    },
    secondary: {
      main: "#ffc300",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#474747",
      secondary: "#2b2d42",
      disabled: "rgba(55, 65, 81, 0.48)",
    },
  },
})
