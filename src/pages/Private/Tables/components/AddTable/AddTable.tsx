import React from "react"
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { CustomInput } from "@/components"
import { useAddTable } from "@/pages"

export interface AddTableInterface {}

const AddTable: React.FC<AddTableInterface> = () => {
  const { register, errors, handleSubmit, onSubmit, handleClick } =
    useAddTable()

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
          Nueva Mesa
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
                disabled={false}
                errors={errors}
                inputProps={{}}
                label="Nombre de la Mesa"
                name="table_name"
                register={register}
                required={true}
                type="text"
              />

              <FormControl
                fullWidth
                margin="dense"
                size="small"
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={register("table_status", {
                    required: "Seleccione una opción",
                  })}
                  label="Estatus"
                  required
                  select
                  size="small"
                >
                  <MenuItem value={1}>Activa</MenuItem>
                  <MenuItem value={0}>Inactiva</MenuItem>
                </TextField>

                {errors.table_status && errors.table_status.message && (
                  <Typography
                    align="center"
                    color="error"
                    variant="overline"
                  >
                    Seleccione un Estatus
                  </Typography>
                )}
              </FormControl>
            </Stack>
          </Grid>
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

              <Button
                color="primary"
                type="submit"
                variant="contained"
              >
                Crear
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  )
}

export default AddTable
