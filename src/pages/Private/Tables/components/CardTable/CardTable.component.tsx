import {Table} from '@/models'
import {
  CardTableBase,
  CardTableFigure,
  CardTableFigureImg,
  CardTableName,
  CardTableStatusOff,
  CardTableStatusOn,
} from '@/pages'
import mesa from '/mesa.jpg'

interface CardTableInterface {
  key: number
  table: Table
}

const CardTable = ({key, table}: CardTableInterface) => {
  return (
    <CardTableBase key={key}>
      <>
        {table.table_status === 0 ? (
          <CardTableStatusOff>Inactiva</CardTableStatusOff>
        ) : (
          <CardTableStatusOn>Activa</CardTableStatusOn>
        )}
      </>
      <CardTableName>{table.table_name}</CardTableName>
      <CardTableFigure>
        <CardTableFigureImg
          src={mesa}
          alt="Mesa"
          loading="lazy"
        />
      </CardTableFigure>
    </CardTableBase>
  )
}

export default CardTable
