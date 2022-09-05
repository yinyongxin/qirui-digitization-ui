import React, { PropsWithChildren } from "react"
import { DesignTypes } from "../typings";

export interface BoxBaseType {
  type?: 'base' | 'blur',
  /**
   * 圆角
   * @defatult 0
   */
  radius?: number,
  /**
   * 模糊
   * @defatult 10
   */
  blur?: number,
  /**
 * 阴影类型
 * @default base
 */
  shadow?: DesignTypes['Shadow'],
  /**
   * 阴影显示条件
   * @default never
   */
  shadowShow?: 'always' | 'never' | 'hover'
}

export type BoxPropsType = BoxBaseType & JSX.IntrinsicElements['div']