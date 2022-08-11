import { ReactNode } from "react"
export interface TitleBaseType {
  type?: 'text' | 'tooltip',
  title: ReactNode,
  tooltip?: string
}

export type TitlePropsType = TitleBaseType