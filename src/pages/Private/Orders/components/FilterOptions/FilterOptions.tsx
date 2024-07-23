import { Button, List, ListItem, Paper } from "@mui/material"

import useSelectors from "../../hooks/useSelectors"
import { useOrderViewContext } from "../../Context/ContextProvider"

const FilterOptions = () => {
  const { categories } = useSelectors()
  const { setFilter } = useOrderViewContext()
  return (
    <Paper
      elevation={0}
      style={{ overflowX: "auto", width: "100%", margin: "5px 0" }}
    >
      <List
        dense={true}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          padding: "5px",
        }}
      >
        <ListItem
          key={crypto.randomUUID()}
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="button"
            size="medium"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={() =>
              setFilter({
                category: 0,
              })
            }
          >
            Todos
          </Button>
        </ListItem>
        {categories &&
          categories.length >= 1 &&
          categories.map((category) => {
            const {
              category_id,
              category_name,
              category_color,
              category_ingredient,
            } = category
            return (
              <ListItem
                key={category_id}
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="button"
                  size="medium"
                  style={{
                    backgroundColor: category_color,
                    color: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() =>
                    setFilter({
                      category: category_id,
                    })
                  }
                >
                  {category_name}
                </Button>
              </ListItem>
            )
          })}
      </List>
    </Paper>
  )
}

export default FilterOptions
