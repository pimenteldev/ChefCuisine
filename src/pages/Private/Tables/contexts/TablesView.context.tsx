import React, {createContext, useContext, useState} from 'react'
import {DialogStateTables} from '../models'

export const TablesContext = createContext<any>(null)

interface Props {
  children: React.ReactNode
}

export const TablesProvider = ({children}: Props) => {
  const [dialog, setDialog] = useState<DialogStateTables>({
    action: 'add',
  })

  return <TablesContext.Provider value={{dialog, setDialog}}>{children}</TablesContext.Provider>
}

export const useTablesViewContext = () => {
  const context = useContext(TablesContext)
  if (context === null || context === undefined) {
    throw new Error('useTablesViewContext must be used within a TablesProvider')
  }
  return context
}
