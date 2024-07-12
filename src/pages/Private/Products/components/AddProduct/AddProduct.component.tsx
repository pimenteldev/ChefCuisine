import {CustomInput} from '@/components'
import {Category, Item} from '@/models'
import {useAddProduct} from '@/pages'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import DeleteRounded from '@mui/icons-material/DeleteRounded'
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
} from '@mui/material'
import React from 'react'

export interface AddProductInterface {}

const AddProduct: React.FC<AddProductInterface> = () => {
  const {
    categories,
    errors,
    file,
    handleChange,
    handleClick,
    handleRemove,
    handleSelect,
    handleSubmit,
    items_categories,
    items,
    listItems,
    onSubmit,
    register,
    setFile,
    setValue,
    units,
  } = useAddProduct()

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
          sx={{my: 1, fontWeight: 700}}
        >
          Nuevo Producto
        </Typography>
        <Divider
          variant="middle"
          sx={{
            borderColor: 'primary.main',
          }}
        />
        <Typography
          align="center"
          variant="body2"
          sx={{mb: 1}}
        >
          Ingresa la foto y la información del nuevo Producto
        </Typography>

        <Grid container>
          <Grid item>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box
                sx={{
                  width: '100%',
                  height: 250,
                  maxHeight: 250,
                  backgroundColor: 'grey.100',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {file ? (
                  <Avatar
                    alt="Nuevo Producto"
                    variant="rounded"
                    src={URL.createObjectURL(file)}
                    sx={{
                      width: 250,
                      height: '100%',
                      p: 0,
                      m: 0,
                      overflow: 'hidden',
                      borderRadius: '1 1 0 0',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <Typography
                    align="center"
                    variant="overline"
                  >
                    Selecciona una Imagen
                  </Typography>
                )}
              </Box>
              <CustomInput
                disabled={false}
                errors={errors}
                inputProps={{onChange: (e: any) => setFile(e.target.files[0])}}
                label=""
                name="product_photo"
                register={register}
                required={true}
                type="file"
              />
              <CustomInput
                disabled={false}
                errors={errors}
                inputProps={{}}
                label="Nombre"
                name="product_name"
                register={register}
                required={true}
                type="text"
              />
              <CustomInput
                disabled={false}
                errors={errors}
                inputProps={{}}
                label="Descripción"
                name="product_description"
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
                  inputProps={register('product_category', {required: 'Seleccione una Categoría'})}
                  label="Categoría"
                  required
                  select
                  size="small"
                >
                  {categories &&
                    categories.map((category: Category) => (
                      <MenuItem
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </MenuItem>
                    ))}
                </TextField>

                {errors.product_category && errors.product_category.message && (
                  <Typography
                    align="center"
                    color="error"
                    variant="overline"
                  >
                    Seleccione una Categoría
                  </Typography>
                )}
              </FormControl>

              <CustomInput
                errors={errors}
                label="Precio Base"
                name="product_base_price"
                register={register}
                required={true}
                type="number"
                inputProps={{
                  min: 0.0,
                  inputMode: 'numeric',
                  step: '0.01',
                  pattern: '[0-9]*',
                }}
                disabled={false}
              />

              <FormControl
                fullWidth
                margin="dense"
                size="small"
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={register('product_items', {required: 'Seleccione una Ingrediente'})}
                  label="Ingredientes"
                  required
                  select
                  size="small"
                >
                  <MenuItem
                    key={0}
                    value={''}
                  >
                    Seleccione
                  </MenuItem>
                  {items?.map((item: Item) => (
                    <MenuItem
                      key={item.item_id}
                      value={item.item_id}
                      onClick={() => {
                        setValue('product_items', '')
                        handleSelect(item)
                      }}
                    >
                      {item.item_name}
                    </MenuItem>
                  ))}
                </TextField>

                {errors.product_items && errors.product_items.message && (
                  <Typography
                    align="center"
                    color="error"
                    variant="overline"
                  >
                    Seleccione un Ingrediente
                  </Typography>
                )}
              </FormControl>

              <List
                dense={true}
                sx={{width: '100%'}}
              >
                {listItems &&
                  listItems.map((item: Item) => {
                    let itemCategory = items_categories.filter(({category_id}) => category_id === item.item_category)
                    let itemUnitMetric = units.filter(({unit_id}) => unit_id === item.item_uni_metric)
                    return (
                      <ListItem
                        key={item.item_id}
                        sx={{
                          backgroundColor: 'grey.100',
                          borderRadius: 1,
                          color: 'primary.main',
                          mb: 1,
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{backgroundColor: 'primary.main'}}>
                            <CheckCircleOutline sx={{color: 'primary.contrastText'}} />
                          </Avatar>
                        </ListItemAvatar>
                        <Box sx={{p: 0}}>
                          <ListItemText
                            primary={item.item_name}
                            secondary={`${itemCategory[0]?.category_name} - ${itemUnitMetric[0]?.unit_name}`}
                          />
                          <CustomInput
                            errors={errors}
                            label="Cantidad"
                            name={`itemCountInput${item.item_id}`}
                            register={register}
                            required={true}
                            type="number"
                            inputProps={{
                              inputMode: 'numeric',
                              step: '0.01',
                              min: 0.1,
                              pattern: '[0-9]*',
                              defaultValue: 0,
                              onChange: (e: React.FormEvent<HTMLInputElement>) => handleChange(e, item),
                            }}
                            disabled={false}
                          />
                        </Box>

                        <ListItemSecondaryAction sx={{mr: 1}}>
                          <IconButton
                            aria-label="Borrar Ingrediente"
                            color="primary"
                            edge="end"
                            onClick={() => handleRemove(item)}
                          >
                            <DeleteRounded color="primary" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })}
              </List>
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
              sx={{mb: 2}}
            >
              <Button
                color="error"
                onClick={handleClick}
                variant="contained"
              >
                Cerrar
              </Button>
              {listItems?.length >= 1 && (
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Añadir
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  )
}

export default AddProduct
