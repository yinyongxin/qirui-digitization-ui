import { Key, PropsWithChildren, ReactNode } from "react"

export type TabPaneBaseType = {
  key?: Key,
  current?: any,
  title?: ReactNode | (() => ReactNode),
  num?: number,
  disabled?: boolean | (() => boolean)
}

export type TabPanePropsType = PropsWithChildren<TabPaneBaseType>