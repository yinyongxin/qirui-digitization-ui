import { useEffect } from "react"
import { useFirst } from "./first"
import { useData } from "./ref"

export const useDomView = (
  className: string,
  deps?: React.DependencyList
) => {
  const data = useData<{
    children?: HTMLCollection
  }>({})

  useEffect(() => {
    data.children = document.querySelector(`.${className}`)?.children
  }, deps || [])

  return (
    options: ScrollIntoViewOptions = {
      behavior: 'smooth'
    }
  ) => {
    data.children?.[0]?.scrollIntoView(options)
  }
}