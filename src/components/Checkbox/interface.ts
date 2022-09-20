import { type } from "os";
import React, { PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings";

export interface CheckboxBaseInterFace {
  /**
   * 是否禁用
   */
  disabled?: boolean,
  /**
 * √
 * 监听数值变化
 */
  onChange?: (value: boolean, e: React.ChangeEvent<HTMLInputElement>) => void,
  /**
   * input属性
   */
  inputAttributes?: JSX.IntrinsicElements['input'],
  /**
   * 传入state变量则开启受控模式
   */
  checked?: boolean,
  /**
   * Checkbox值
   */
  value: string | number,
  /**
   * label
   * 没有children是则使用value作为label
   */
  children?: ReactNode | ((checked: boolean) => ReactNode)
}

export type CheckboxPropsType = CheckboxBaseInterFace & Omit<JSX.IntrinsicElements['input'], 'children'>

export type CheckboxGroupType = {
  /**
   * Checkbox组内容
   */
  children?: ReactNode,
  // 默认值
  defaultValue?: (string | number)[],
  /**
   * CheckboxGroup值
   * 传入state变量则开启受控模式
   */
  value?: (string | number)[],
  /**
   * 单选组单选对象
   */
  options?: (
    string | {
      label: ReactNode,
      value: string | number
    }
  )[]
  /**
   * 自定义Label
   */
  customLabel?: (checked: boolean, label: ReactNode) => ReactNode,
  /**
   * 选择值变化触发
   */
  onCheckedChange?: (value: string | number) => void
} & JSX.IntrinsicElements['div']


export type CheckboxGroupContextType = {
  name: string,
  inCheckboxGroup: boolean,
  value?: (string | number)[]
} & Pick<CheckboxGroupType, 'onCheckedChange'>