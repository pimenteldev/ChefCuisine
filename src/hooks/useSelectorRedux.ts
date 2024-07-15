import { AppStore } from "@/redux/store"
import { useSelector } from "react-redux"

const useSelectorRedux = () => {
  const tables = useSelector((store: AppStore) => store.tables)

  return {
    tables,
  }
}

export default useSelectorRedux
