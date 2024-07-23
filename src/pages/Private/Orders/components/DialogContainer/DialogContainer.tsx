import CustomDialog from "@/components/CustomDialog/CustomDialog"

import { useOrderViewContext } from "../../Context/ContextProvider"
import OrderPreview from "../OrderPreview/OrderPreview"

function DialogContainer() {
  const { dialog } = useOrderViewContext()
  const { action } = dialog
  return (
    <CustomDialog>
      {dialog && action === "preview" ? (
        <OrderPreview />
      ) : action === "facture" ? (
        <div>facture</div>
      ) : (
        <div>viewFacture</div>
      )}
    </CustomDialog>
  )
}

export default DialogContainer
