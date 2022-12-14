import { HTMLInputTypeAttribute } from "react";
import { InputTextPropsType } from "./InputText/interface";

/**
 * input 通用类型
 */
export type InputCurrencyType = {

  /**
   * √
   * 输入框的值，如果传入则进入受控模式
   */
  value?: any,
  type?: HTMLInputTypeAttribute,
  validateStatus?: 'success' | 'warning' | 'error' | 'validating'
} & Pick<JSX.IntrinsicElements['input'], 'name'>

export type InputPropsType = InputTextPropsType

export type InputDataRef = {
  focusState: 'blur' | 'focus'
} 