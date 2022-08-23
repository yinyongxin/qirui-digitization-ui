import { PropsWithChildren, ReactNode } from "react"

export type PortalPropsType = PropsWithChildren<{
  container?: Element | DocumentFragment,
  key?: null | string,
  forceRender?: boolean,
  visible?: boolean
}> 