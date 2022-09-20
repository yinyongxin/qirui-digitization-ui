import { type } from "os";
import React, { PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings";

export interface RadioBaseInterFace {
  /**
   * 是否禁用
   */
  disabled?: boolean,
  /**
 * √
 * 监听数值变化
 */
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void,
  /**
   * input属性
   */
  inputAttributes?: JSX.IntrinsicElements['input'],
  /**
   * 传入state变量则开启受控模式
   */
  checked?: boolean,
  /**
   * Radio值
   */
  value: string | number,
  /**
   * label
   * 没有children是则使用value作为label
   */
  children?: ReactNode | ((checked: boolean) => ReactNode)
}

export type RadioPropsType = RadioBaseInterFace & Pick<JSX.IntrinsicElements['input'], 'className' | 'style' | 'defaultChecked' | 'name'>

export type RadioGroupType = {
  /**
   * Radio组内容
   */
  children?: ReactNode,
  // 默认值
  defaultValue?: string | number,
  /**
   * RadioGroup值
   * 传入state变量则开启受控模式
   */
  value?: string | number,
  /**
   * 单选组单选对象
   */
  options?: (
    (string | number) | {
      label: ReactNode,
      value: string
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
} & Pick<JSX.IntrinsicElements['div'], 'className' | 'style'>


export type RadioGroupContextType = {
  name: string,
  inRadioGroup: boolean,
  value?: string | number
} & Pick<RadioGroupType, 'onCheckedChange'>