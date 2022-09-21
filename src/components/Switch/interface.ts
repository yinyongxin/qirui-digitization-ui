import React, { PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings";

export interface SwitchBaseType {
  /**
   * 开关是否打开
   * @default undefined
   */
  checked?: boolean
  /**
   * 		默认是否选中
   * @default false
   */
  defaultChecked?: boolean
  /**
   * 	三种样式类型
   * @default circle
   */
  type?: 'circle' | 'round' | 'line',
  /**
  * 	开关的尺寸，有 small 和 default 可供选择。
  * @default default
  */
  size?: 'default' | 'small'
  /**
    * 开关打开时的文案，small 尺寸不生效。
    * @default circle
    */
  checkedText?: ReactNode
  /**
    * 开关关闭时的文案，small 尺寸不生效。
    * @default circle
    */
  uncheckedText?: ReactNode
  /**
   * 点击开关的回调
   */
  onChange?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

  /**
   * 是否禁用
   */
  disabled?: boolean
}

export type SwitchPropsType = SwitchBaseType & Pick<JSX.IntrinsicElements['div'], 'className' | 'style'> 