import {CustomDialog} from '@/components'
import {AddProduct, ModifyProduct, useProductsViewContext} from '@/pages'

function DialogContainer() {
  const {dialog} = useProductsViewContext()
  const {action} = dialog
  return (
    <CustomDialog>
      {dialog && action === 'add' ? <AddProduct /> : action === 'modify' ? <ModifyProduct /> : <>remove</>}
    </CustomDialog>
  )
}

export default DialogContainer
