import {baseUrl} from '@/constants'

async function AddProductService(formData: FormData) {
  const response = await fetch(`${baseUrl}products.php`, {
    method: 'POST',
    body: formData,
  })
  const json = await response.json()
  return json
}
export default AddProductService
