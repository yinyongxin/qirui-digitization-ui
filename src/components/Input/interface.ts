import { HTMLInputTypeAttribute } from "react";
import { InputTextPropsType } from "./InputText/interface";

/**
 * input 通用类型
 */
export type InputCurrencyType = {
  /**
 * √
 * 	默认值
 */
  defaultValue?: string,
  /**
   * √
   * 输入框的值，如果传入则进入受控模式
   */
  value?: any,
  type?: HTMLInputTypeAttribute,
  validateStatus?: 'success' | 'warning' | 'error' | 'validating'
}

export type InputPropsType = InputTextPropsType