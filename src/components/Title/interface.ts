import { PropsWithChildren, ReactNode } from "react"
import { TextBaseType } from "../Text/interface"
export interface TitleBaseType {
  type?: 'text' | 'tooltip',
  title: ReactNode,
  tooltip?: string
  heading?: TextBaseType['level']
  divider?: boolean
  textProps?: TextBaseType,
  bodyProps?: JSX.IntrinsicElements['div'],
  description?: ReactNode,
  margin?: {
    top?: boolean | number | string,
    right?: boolean | number | string,
    bottom?: boolean | number | string,
    left?: boolean | number | string,
  }
}

export type TitlePropsType = PropsWithChildren<TitleBaseType> & JSX.IntrinsicElements['div']