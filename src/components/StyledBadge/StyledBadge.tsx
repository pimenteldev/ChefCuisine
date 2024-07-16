import styled from "styled-components"
import { Badge } from "@mui/material"

export const StyledBadge = ({ children }) => {
  const StyledBadge = styled(Badge)(({}) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#10b981",
      color: "#10b981",
      boxShadow: `0 0 0 2px #fff`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
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
