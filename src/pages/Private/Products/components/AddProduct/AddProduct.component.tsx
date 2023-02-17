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
    handleSelect,
    handleRemove,
    handleSubmit,
    setValue,
    items,
    items_categories,
    listItems,
    onSubmit,
    register,
    setFile,
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
                register={register}
                name="product_photo"
                errors={errors}
                type="file"
                required={true}
                label=""
                inputProps={{onChange: (e: any) => setFile(e.target.files[0])}}
                disabled={false}
              />
              <CustomInput
                register={register}
                name="product_name"
                errors={errors}
                label="Nombre"
                type="text"
                required={true}
                inputProps={{}}
                disabled={false}
              />
              <CustomInput
                register={register}
                name="product_description"
                errors={errors}
                label="Descripción"
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
                  defaultValue=""
                  inputProps={register('product_category', {required: 'Seleccione una Categoría'})}
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
                    color="error"
                    align="center"
                    variant="overline"
                  >
                    Seleccione una Categoría
                  </Typography>
                )}
              </FormControl>

              <CustomInput
                register={register}
                name="product_base_price"
                errors={errors}
                label="Precio Base"
                type="number"
                required={true}
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
                size="small"
                margin="dense"
              >
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Ingredientes"
                  required
                  defaultValue=""
                  inputProps={register('product_items', {required: 'Seleccione una Ingrediente'})}
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
                    color="error"
                    align="center"
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
                          color: 'primary.main',
                          borderRadius: 1,
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
                            register={register}
                            name={`itemCountInput${item.item_id}`}
                            errors={errors}
                            label="Cantidad"
                            type="number"
                            required={true}
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
                            color="primary"
                            edge="end"
                            aria-label="Borrar Ingrediente"
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
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{mb: 2}}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleClick}
              >
                Cerrar
              </Button>
              {listItems?.length >= 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
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
