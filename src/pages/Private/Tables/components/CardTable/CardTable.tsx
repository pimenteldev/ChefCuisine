import { Table } from "@/models/tables"
import { useTablesViewContext } from "../../contexts/TablesView"
import {
  CardTableLayout,
  CardTableStatusOff,
  CardTableStatusOn,
  CardTableBase,
  CardTableName,
  CardTableFigure,
  CardTableFigureImg,
} from "../../styled-components/CardTable"
import mesa from "/mesa.jpg"
import { dialogOpenSubject$ } from "@/components/CustomDialog/CustomDialog.component"

interface CardTableInterface {
  table: Table
}

const CardTable = ({ table }: CardTableInterface) => {
  const { setDialog } = useTablesViewContext()
  const handleClickModify = (table: Table) => {
    setDialog({ action: "modify", table })
    dialogOpenSubject$.setSubject = true
  }

  return (
    <CardTableLayout onClick={() => handleClickModify(table)}>
      {table.table_status === 0 ? (
        <CardTableStatusOff>Inactiva</CardTableStatusOff>
      ) : (
        <CardTableStatusOn>Activa</CardTableStatusOn>
      )}
      <CardTableBase>
        <CardTableName>{table.table_name}</CardTableName>
        <CardTableFigure>
          <CardTableFigureImg
            src={mesa}
            alt="Mesa"
            loading="lazy"
          />
        </CardTableFigure>
      </CardTableBase>
    </CardTableLayout>
  )
}

export default CardTable
