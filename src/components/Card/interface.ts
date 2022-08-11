import React, { PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings";

export interface CardBaseType {
  /**
   * 状态 
   * 默认：default 成功：success 失败：error 警告：warnning
   */
  status?: DesignTypes['Status'];
  title?: ReactNode,
  header?: ReactNode,
  footer?: ReactNode,
  headerStyle?: React.CSSProperties,
  footerStyle?: React.CSSProperties,
  bodyStyle?: React.CSSProperties,
  cardStyle?: React.CSSProperties,
  width?: number,
  borders?: DesignTypes['Direction'][]
}

export type CardPropsType = PropsWithChildren<CardBaseType>