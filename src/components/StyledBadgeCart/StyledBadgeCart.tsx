import { Badge, BadgeProps, styled } from "@mui/material"

export const StyledBadgeCart = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "0 4px",
    color: theme.palette.primary.main,
  },
}))
