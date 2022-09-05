import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { PortalPropsType } from "./interface"

const Portal = (props: PortalPropsType) => {
  const {
    children,
    container = document.body,
    forceRender,
    visible
  } = props

  const ref = useRef<{
    div?: HTMLDivElement,
    container: Element | DocumentFragment,
    isRender: boolean
  }>({
    container,
    isRender: false,
  })

  useEffect(() => {
    if (!ref.current.isRender) {
      ref.current.div = document.createElement('div');
      ref.current.isRender = true
    }
  }, [])
  return (
    <>
      {(forceRender || visible) && createPortal(children, ref.current.container)}
    </>
  )
}

export default Portal