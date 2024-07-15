import { useSelector } from "react-redux"
import { AppStore } from "@/redux/store"

function useSearchCategory(currentCategoryId: Number) {
  const { categories } = useSelector((store: AppStore) => store.products)
  const colorCategory = categories.filter(
    ({ category_id }) => category_id === currentCategoryId
  )

  return { colorCategory }
}

export default useSearchCategory
