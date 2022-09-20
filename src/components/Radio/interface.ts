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
  value?: string | number | boolean,
  /**
   * label
   * 没有children是则使用value作为label
   */
  children?: ReactNode | ((checked: boolean) => ReactNode)
}

export type RadioPropsType = RadioBaseInterFace & Omit<JSX.IntrinsicElements['input'], 'children'>

export type RadioGroupType = {
  /**
   * Radio组内容
   */
  children?: ReactNode,
  // 默认值
  defaultValue?: string,
  /**
   * RadioGroup值
   * 传入state变量则开启受控模式
   */
  value?: string,
  /**
   * 单选组单选对象
   */
  options?: (
    string | {
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
  onCheckedChange?: (value: string) => void
} & JSX.IntrinsicElements['div']


export type RadioGroupContextType = {
  name: string,
  inRadioGroup: boolean,
  value?: string
} & Pick<RadioGroupType, 'onCheckedChange'>