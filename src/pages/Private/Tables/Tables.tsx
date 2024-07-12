import {Container, Typography} from '@mui/material'
import React from 'react'
import {FabButtonTables, TablesList} from './components'
import {TablesProvider} from './contexts'
import DialogContainerTables from './components/DialogContainerTables/DialogContainerTables.component'

export interface TablesInterface {}

const Tables: React.FC<TablesInterface> = () => {
  return (
    <TablesProvider>
      <Container sx={{mb: 4}}>
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            mb: 0,
          }}
        >
          Mesas
        </Typography>
        <TablesList />

        <FabButtonTables />
        <DialogContainerTables />
      </Container>
    </TablesProvider>
  )
}

export default Tables
