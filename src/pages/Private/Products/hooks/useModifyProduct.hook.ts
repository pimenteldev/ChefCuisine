import {dialogCloseSubject$} from '@/components/CustomDialog/CustomDialog.component'
import {snackbarOpenSubject$} from '@/components/CustomSnackBar/CustomSnackBar.component'
import {Item, Product} from '@/models'
import {removeProduct, useGetAllProducts, useProductsViewContext} from '@/pages'
import {AppStore} from '@/redux/store'
import {AlertColor} from '@mui/material'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {v4 as newId} from 'uuid'
import AddProductService from '../services/addNewProduct.service'
import ModifyProductService from '../services/modifyProduct.service'

function useModifyProduct() {
  const {dialog} = useProductsViewContext()
  const {product} = dialog
  const [listItems, setListItems] = useState<Item[]>(product.product_items)
  const [file, setFile] = useState()
  const {items, items_categories, categories, units} = useSelector((store: AppStore) => store.productsViewState)

  const {callToEndPointsAndDispatchs} = useGetAllProducts()

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: product,
  })

  useEffect(() => {
    setValue('product_name', product.product_name)
    setValue('product_description', product.product_description)
    setValue('product_category', product.product_category)
    setValue('product_base_price', product.product_base_price)
    setValue('product_status', product.product_status)
  }, [product])

  const handleClick = () => {
    dialogCloseSubject$.setSubject = false
  }

  const handleSnackBar = (message: string, severity: AlertColor) => {
    snackbarOpenSubject$.setSubject = {
      open: true,
      message: message,
      severity: severity,
    }
  }

  const handleSelect = (itemSelect: Item) => {
    const itemsFiltered = listItems.filter(({item_id}) => item_id === itemSelect.item_id)
    if (itemsFiltered.length === 0) {
      setListItems([...listItems, {...itemSelect, item_count: 0}])
    } else {
      handleSnackBar(`${itemSelect.item_name} ya existe en la lista`, 'warning')
    }
  }

  const handleRemove = (itemSelect: Item) => {
    const newList = listItems.filter(({item_id}) => item_id !== itemSelect.item_id)
    setListItems(newList)
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>, itemChange: Item) => {
    setListItems(
      listItems.map((item: Item) =>
        item.item_id === itemChange.item_id ? {...item, item_count: parseFloat(e.currentTarget.value)} : item
      )
    )
  }

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    const newIdProduct = newId()
    const productModify: Product = {
      product_id: product.product_id,
      product_base_price: data.product_base_price,
      product_category: data.product_category,
      product_description: data.product_description,
      product_items: listItems,
      product_name: data.product_name,
      product_photo: data.product_photo,
      product_photo_thumb: data.product_id,
      product_status: 1,
    }

    const productFormatedForApi = {...productModify, product_items: JSON.stringify(productModify.product_items)}

    formData.append('file', file || '')
    formData.append('photo', newIdProduct)
    formData.append('photo_prev', product.product_photo)
    formData.append('location', 'productos')
    formData.append('product', JSON.stringify(productFormatedForApi))
    formData.append('method', 'PUT')

    await ModifyProductService(formData)
      .then((json) => {
        if (json.modify === true) {
          handleSnackBar(`Has Modificado un Producto`, 'success')
          handleClick()
          callToEndPointsAndDispatchs()
        } else {
          handleSnackBar(`${json.message}`, 'error')
        }
      })
      .catch((err) => {
        handleSnackBar(`Ups, algo salió mal.`, 'error')
        console.error(err)
      })
  }

  const handleClickDelete = async (product_id: string, product_photo: string) => {
    await removeProduct(product_id, product_photo)
      .then((json) => {
        if (json.delete === true) {
          handleSnackBar(`Has Eliminado un Producto`, 'success')
          handleClick()
          callToEndPointsAndDispatchs()
        } else {
          handleSnackBar(`${json.message}`, 'error')
        }
      })
      .catch((err) => {
        handleSnackBar(`Ups, algo salió mal.`, 'error')
        console.error(err)
      })
  }

  return {
    categories,
    errors,
    file,
    handleChange,
    handleClick,
    handleSelect,
    handleRemove,
    handleSubmit,
    handleClickDelete,
    items,
    items_categories,
    listItems,
    onSubmit,
    register,
    setFile,
    units,
    product,
  }
}

export default useModifyProduct
