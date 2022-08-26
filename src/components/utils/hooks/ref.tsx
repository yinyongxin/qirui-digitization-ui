import { useRef } from "react"

export const useData = <I extends unknown = any>(initData: I) => {
  const ref = useRef<I>(initData)
  return ref.current
}