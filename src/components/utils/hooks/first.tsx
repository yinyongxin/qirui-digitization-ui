import { useEffect, useRef } from "react"

export const useFirst = (callback?: (isFirst: boolean) => void, deps?: React.DependencyList) => {
  const isFirst = useRef(true)
  callback && callback(isFirst.current)
  useEffect(() => {
    isFirst.current = false
  }, deps || [])
}

export const useIsFirst = (callback: () => void) => {
  useFirst((frist) => {
    if (frist) {
      callback && callback()
    }
  })
}

export const useNotFirst = (callback: () => void, deps?: React.DependencyList) => {
  useFirst((frist) => {
    if (!frist) {
      callback && callback()
    }
  }, deps)
}