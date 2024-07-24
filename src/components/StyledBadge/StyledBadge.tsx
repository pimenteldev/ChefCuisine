import styled from "styled-components"
import { Badge, BadgeProps } from "@mui/material"

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
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
