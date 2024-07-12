import {baseUrl} from '@/constants'
import {TablesViewApi} from '@/models'

export const getAllTables = async (): Promise<TablesViewApi> => {
  const response = await fetch(`${baseUrl}tables.php`, {
    method: 'GET',
  })

  return response.json()
}
