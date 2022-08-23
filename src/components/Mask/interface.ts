import React, { PropsWithChildren } from "react"
import { DesignTypes } from "../typings";

export interface MaskBaseType {
  /**
   * √
   * 层级
   * 默认 1000
   */
  zIndex?: React.CSSProperties['zIndex'],
  /**
   * 是否显示
   * 默认为 true
   */
  visible?: boolean,
  /**
   * 点击穿透
   * 默认为 false
   */
  clickThrough?: boolean
  animation?: boolean
}

export type MaskPropsType = MaskBaseType & JSX.IntrinsicElements['div']