import { Key, PropsWithChildren, ReactNode } from "react"

export type TabPaneBaseType = {
  key?: Key,
  current?: any,
  title?: ReactNode | (() => ReactNode),
  num?: number,
  disabled?: boolean | (() => boolean),
  /**
   * 用于给activeTabChange事件传递参数
   */
  values?: Record<string, any>
}

export type TabPanePropsType = PropsWithChildren<TabPaneBaseType>