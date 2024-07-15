import { useSelectorRedux } from "@/hooks"
import { useState } from "react"

const useSelectTable = () => {
  const { tables } = useSelectorRedux()

  const [isTableSelected, setIsTableSelected] = useState(true)

  return {
    isTableSelected,
    tables,
  }
}

export default useSelectTable
