import React, { PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../../typings";
import { InputCurrencyType } from "../interface";

export interface InputNumberBaseInterFace {
  /**
  * √
  * 	默认值
  */
  defaultValue?: number,
  /**
   * √
   * 输入框的值，如果传入则进入受控模式
   */
  value?: number,
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
   * 大小
   */
  size?: DesignTypes['Size'],
  /**
   * √
   * 	输入框后添加元素
   */
  addAfter?: ReactNode | ((value?: string) => ReactNode),
  /**
   * √
   * 	输入框前添加元素
   */
  addBefore?: ReactNode | ((value?: string) => ReactNode),
  /**
   * √
   * 	添加前缀文字或者图标
   */
  prefix?: ReactNode | ((value?: string) => ReactNode),
  /**
   * √
   * 添加后缀文字或者图标
   */
  suffix?: ReactNode | ((value?: string) => ReactNode),
  /**
 * √
 * 宽度
 */
  width?: number | string,
  /**
   * √
   * 高度
   */
  height?: number | string
  /**
   * √
   * 边框
   */
  borders?: Partial<Record<DesignTypes['Direction'], boolean>> | null,
  /**
   * 监听清除操作
   */
  onClear?: () => void,
  onPressEnter?: (e: Event) => void,

  /**
   * √
   * 	输入框提示文字
   */
  placeholder?: string,
  /**
   * 输入框最大输入的长度；设置 errorOnly为 true 后，超过 maxLength 会展示 error 状态，并不限制用户输入。
   */
  maxLength?: number | { length: number; errorOnly?: boolean }
  /**
 * √
 * 监听数值变化
 */
  onChange?: (value: number | undefined, e: React.ChangeEvent<HTMLInputElement>) => void,
  /**
 * √
 * 是否只读
 */
  readOnly?: boolean,
  inputAttributes?: JSX.IntrinsicElements['input'],

}

export type InputNumberPropsType = InputNumberBaseInterFace & InputCurrencyType & Pick<JSX.IntrinsicElements['div'], 'style' | 'className'>