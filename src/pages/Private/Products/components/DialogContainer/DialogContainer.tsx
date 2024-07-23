import CustomDialog from "@/components/CustomDialog/CustomDialog"
import { useProductsViewContext } from "../../contexts/ProductsView"
import AddProduct from "../AddProduct/AddProduct"
import ModifyProduct from "../ModifyProduct/ModifyProduct"

function DialogContainer() {
  const { dialog } = useProductsViewContext()
  const { action } = dialog
  return (
    <CustomDialog>
      {dialog && action === "add" ? (
        <AddProduct />
      ) : action === "modify" ? (
        <ModifyProduct />
      ) : (
        <>remove</>
      )}
    </CustomDialog>
  )
}

export default DialogContainer
