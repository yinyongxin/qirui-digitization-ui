import { PropsWithChildren, ReactNode } from "react"
export interface TitleBaseType {
  type?: 'text' | 'tooltip',
  title: ReactNode,
  tooltip?: string
}

export type TitlePropsType = PropsWithChildren<TitleBaseType> & JSX.IntrinsicElements['h3']