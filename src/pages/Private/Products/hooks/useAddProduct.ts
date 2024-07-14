import { dialogCloseSubject$ } from "@/components/CustomDialog/CustomDialog.component"
import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar.component"
import { Item, Product } from "@/models"
import { useGetAllProducts } from "@/pages"
import { AppStore } from "@/redux/store"
import { AlertColor } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { v4 as newId } from "uuid"
import AddProductService from "../services/addNewProduct"

function useAddProduct() {
  const [listItems, setListItems] = useState<Item[]>([])
  const [file, setFile] = useState()
  const { items, items_categories, categories, units } = useSelector(
    (store: AppStore) => store.productsViewState
  )

  const { callToEndPointsAndDispatchs } = useGetAllProducts()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

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
    const itemsFiltered = listItems.filter(
      ({ item_id }) => item_id === itemSelect.item_id
    )
    if (itemsFiltered.length === 0) {
      setListItems([...listItems, { ...itemSelect, item_count: 0 }])
    } else {
      handleSnackBar(`${itemSelect.item_name} ya existe en la lista`, "warning")
    }
  }

  const handleRemove = (itemSelect: Item) => {
    const newList = listItems.filter(
      ({ item_id }) => item_id !== itemSelect.item_id
    )
    setListItems(newList)
  }

  const handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    itemChange: Item
  ) => {
    setListItems(
      listItems.map((item: Item) =>
        item.item_id === itemChange.item_id
          ? { ...item, item_count: parseFloat(e.currentTarget.value) }
          : item
      )
    )
  }

  const onSubmit = async (data: any) => {
    const formData = new FormData()

    const newIdProduct = newId()
    const newProduct: Product = {
      product_id: newIdProduct,
      product_base_price: data.product_base_price,
      product_category: data.product_category,
      product_description: data.product_description,
      product_items: listItems,
      product_name: data.product_name,
      product_photo: data.product_photo,
      product_photo_thumb: data.product_id,
      product_status: 1,
    }

    const productFormatedForApi = {
      ...newProduct,
      product_items: JSON.stringify(newProduct.product_items),
    }

    formData.append("file", file || "")
    formData.append("photo", newIdProduct)
    formData.append("location", "productos")
    formData.append("product", JSON.stringify(productFormatedForApi))

    await AddProductService(formData)
      .then((json) => {
        if (json.created === true) {
          handleSnackBar(`Has registrado un Nuevo Producto`, "success")
          handleClick()
          callToEndPointsAndDispatchs()
        } else {
          handleSnackBar(`${json.message}`, "error")
        }
      })
      .catch((err) => {
        handleSnackBar(`Ups, algo salió mal.`, "error")
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
    setValue,
    items,
    items_categories,
    listItems,
    onSubmit,
    register,
    setFile,
    units,
  }
}

export default useAddProduct
