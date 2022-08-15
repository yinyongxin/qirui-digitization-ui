import React, { PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings";

export interface InputBaseType {
  /**
   * 状态 
   * 默认：default 成功：success 失败：error 警告：warnning
   */
  status?: DesignTypes['Status'],
  /**
   * 	允许清空输入框
   */
  allowClear?: boolean,
  /**
   * 是否禁用
   */
  disabled?: boolean,
  /**
   * 是否只读
   */
  readOnly?: boolean,
  /**
   * showWordLimit
   */
  showWordLimit?: boolean,
  /**
   * 	默认值
   */
  defaultValue?: string,
  label?: string,
  lableConfig?: {
    align?: 'left' | 'right',
    width?: string | number
  }
  /**
   * 	输入框提示文字
   */
  placeholder?: string,
  /**
   * 输入框的值，受控模式
   */
  value?: string,
  size?: DesignTypes['Size'],
  /**
   * 	输入框后添加元素
   */
  addAfter?: ReactNode | ((value: string) => ReactNode),
  /**
   * 	输入框前添加元素
   */
  addBefore?: ReactNode | ((value: string) => ReactNode),
  /**
   * 	添加前缀文字或者图标
   */
  prefix?: ReactNode | ((value: string) => ReactNode),
  /**
   * 添加后缀文字或者图标
   */
  suffix?: ReactNode | ((value: string) => ReactNode),
  height?: number | string
  width?: number | string,
  /**
   * 输入框最大输入的长度；设置 errorOnly为 true 后，超过 maxLength 会展示 error 状态，并不限制用户输入。
   */
  maxLength?: number | { length: number; errorOnly?: boolean }
  borders?: Partial<Record<DesignTypes['Direction'], boolean>> | null,
  onChange?: (value: string, e: Event) => void,
  onClear?: () => void,
  onPressEnter?: (e: Event) => void
}

export type InputPropsType = InputBaseType & JSX.IntrinsicElements['input']