import React, { PropsWithChildren } from "react"
import { DesignTypes } from "../typings";

export interface CardBaseType {
  /**
   * 状态 
   * 默认：default 成功：success 失败：error 警告：warnning
   */
  status?: DesignTypes['Status'];
  title?: string
  headerStyle?: React.CSSProperties,
  bodyStyle?: React.CSSProperties,
  cardStyle?: React.CSSProperties,
  width?: number,
  border?: Array<'top' | 'right' | 'bottom' | 'left'>
}

export type CardPropsType = PropsWithChildren<CardBaseType>