import { Table } from "@/models"
import {
  CardTableLayout,
  CardTableBase,
  CardTableFigure,
  CardTableFigureImg,
  CardTableName,
  CardTableStatusOff,
  CardTableStatusOn,
} from "@/pages"
import mesa from "/mesa.jpg"
import { TruncateText } from "@/styled-components"

interface CardTableInterface {
  table: Table
}

const CardTable = ({ table }: CardTableInterface) => {
  return (
    <CardTableLayout>
      {table.table_status === 0 ? (
        <CardTableStatusOff>Inactiva</CardTableStatusOff>
      ) : (
        <CardTableStatusOn>Activa</CardTableStatusOn>
      )}
      <CardTableBase>
        <CardTableName>
          <TruncateText>{table.table_name}</TruncateText>
        </CardTableName>
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
