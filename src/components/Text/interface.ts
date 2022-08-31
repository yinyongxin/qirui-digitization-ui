import React, { PropsWithChildren } from "react"
import { DesignTypes } from "../typings";

export interface TextBaseType {
  /**
   * 禁用状态
   */
  disabled?: boolean
  /**
   * 粗体
   */
  bold?: boolean
  /**
   * 开启复制功能
   */
  copyable?: boolean
  /**
   * 	下划线样式
   */
  underline?: boolean
  /**
   * 删除线样式
   */
  delete?: boolean
  /**
   * 文本类型
   */
  type?: DesignTypes['Status'] | 'base' | 'secondary',
  /**
   * 级别
   */
  level?: 1 | 2 | 3 | 4
  /**
   * 字体
   */
  font?: 'sc' | 'teko' | 'orbitron'
}

export type TextPropsType = TextBaseType & JSX.IntrinsicElements['span']