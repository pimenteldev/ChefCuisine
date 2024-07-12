import {CustomDialog} from '@/components'
import {AddProduct, ModifyProduct, useTablesViewContext} from '@/pages'

function DialogContainerTables() {
  const {dialog} = useTablesViewContext()
  const {action} = dialog
  return (
    <CustomDialog>
      {dialog && action === 'add' ? <>Div</> : action === 'modify' ? <ModifyProduct /> : <>remove</>}
    </CustomDialog>
  )
}

export default DialogContainerTables
