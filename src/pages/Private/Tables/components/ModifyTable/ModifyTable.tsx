import { CustomInput } from "@/components"
import { useModifyTable, useRemoveTable } from "@/pages"
import {
  Alert,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"

export interface ModifyTableInterface {}

const ModifyTable: React.FC<ModifyTableInterface> = () => {
  const { errors, handleClick, handleSubmit, onSubmit, register, table } =
    useModifyTable()

  const { handleClickRemove } = useRemoveTable()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <Container>
        <Typography
          color="primary"
          align="center"
          variant="h5"
          sx={{ my: 1, fontWeight: 700 }}
        >
          Modificando una Mesa
        </Typography>
        <Divider
          variant="middle"
          sx={{
            borderColor: "primary.main",
          }}
        />
        <Typography
          align="center"
          variant="body2"
          sx={{ mb: 1 }}
        >
          Ingresa la información de la nueva Mesa
        </Typography>
        <Grid container>
          <Grid
            item
            xs={12}
          >
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              flexWrap="wrap"
            >
              <CustomInput
                register={register}
                name="table_id"
                errors={errors}
                label="Table ID"
                type="text"
                required={true}
                inputProps={{}}
                disabled={true}
              />

              <CustomInput
                register={register}
                name="table_name"
                errors={errors}
                label="Nombre de la Mesa"
                type="text"
                required={true}
                inputProps={{}}
                disabled={false}
              />

              <FormControl
                fullWidth
                size="small"
                margin="dense"
              >
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Categoría"
                  required
                  defaultValue={table.table_status}
                  inputProps={register("table_status", {
                    required: "Seleccione una opción",
                  })}
                >
                  <MenuItem value={1}>Activa</MenuItem>
                  <MenuItem value={0}>Inactiva</MenuItem>
                </TextField>

                {errors.table_status && errors.table_status.message && (
                  <Typography
                    color="error"
                    align="center"
                    variant="overline"
                  >
                    Seleccione una opción
                  </Typography>
                )}
              </FormControl>
            </Stack>
          </Grid>
          {table?.table_active !== 0 && (
            <>
              <Alert
                severity={"info"}
                variant="filled"
                sx={{ width: "100%", color: "white" }}
              >
                Esta mesa no puede ser eliminada o modificada; posee un pedido
                activo.
              </Alert>
            </>
          )}
          <Grid
            item
            xs={12}
          >
            <Stack
              alignItems="baseline"
              direction="row"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Button
                color="error"
                onClick={handleClick}
                variant="contained"
              >
                Cerrar
              </Button>
              {table?.table_active === 0 && (
                <>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleClickRemove(table.table_id)}
                  >
                    Eliminar
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                  >
                    Modificar
                  </Button>
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  )
}

export default ModifyTable
