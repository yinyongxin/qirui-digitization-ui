import { type } from "os";
import React, { PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings";

export interface RadioBaseInterFace {
  /**
   * 状态 
   * 默认：default 成功：success 失败：error 警告：warnning
   */
  status?: DesignTypes['Status'],
  /**
   * 是否禁用
   */
  disabled?: boolean,
  /**
 * √
 * 监听数值变化
 */
  onChange?: (value: boolean, e: React.ChangeEvent<HTMLInputElement>) => void,

  inputAttributes?: JSX.IntrinsicElements['input'],

  checked?: boolean,
  value?: string,
  children?: ReactNode | ((checked: boolean) => ReactNode)
}

export type RadioPropsType = RadioBaseInterFace & Omit<JSX.IntrinsicElements['input'], 'children'>

export type RadioGroupType = {
  children?: ReactNode,
  defaultValue?: string,
  value?: string,
  options?: (string | { label: ReactNode, value: string })[]
  onCheckedChange?: (value: string) => void
} & JSX.IntrinsicElements['div']


export type RadioGroupContextType = {
  name: string,
  inRadioGroup: boolean,
  value?: string
} & Pick<RadioGroupType, 'onCheckedChange'>