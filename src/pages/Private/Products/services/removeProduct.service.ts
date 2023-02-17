import {baseUrl} from '@/constants'

async function RemoveProductService(product_id: string, product_photo: string) {
  const response = await fetch(`${baseUrl}products.php?product_id=${product_id}&product_photo=${product_photo}`, {
    method: 'DELETE',
  })
  const json = await response.json()
  return json
}
export default RemoveProductService
