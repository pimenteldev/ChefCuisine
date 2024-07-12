import {Table} from '@/models'
import {CardTable, CardTableGrid, useGetAllTables} from '@/pages'
import {AppStore} from '@/redux/store'
import {Alert} from '@mui/material'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'

function TablesList() {
  const {callToEndPointsAndDispatchs} = useGetAllTables()
  const {tables} = useSelector((store: AppStore) => store.tablesViewState)

  useEffect(() => {
    callToEndPointsAndDispatchs()
  }, [])

  return tables.length >= 1 ? (
    <CardTableGrid>
      {tables &&
        tables.map((table: Table) => {
          return (
            <CardTable
              key={table.table_id}
              table={table}
            />
          )
        })}
    </CardTableGrid>
  ) : (
    <Alert severity="info">No existen Mesas Registradas</Alert>
  )
}

export default TablesList
