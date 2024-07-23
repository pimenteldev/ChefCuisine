import styled from "styled-components"
import { Badge } from "@mui/material"

export const StyledBadge = ({ children }) => {
  const StyledBadge = styled(Badge)(({}) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "var(--primary-color)",
      color: "var(--primary-color)",
      boxShadow: `0 0 0 2px var(--background-color)`,
      "&::after": {
        position: "absolute",
        left: "-1px",
        bottom: "-1px",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "5px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }))

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
    >
      {children}
    </StyledBadge>
  )
}

export default StyledBadge
