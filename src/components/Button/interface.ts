import React, { PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings";

export interface ButtonBaseType {
  /**
   * 三个大小  
   * 默认：default 小：small 大：large
   */
  size?: DesignTypes['Size'];
  /**
   * 状态 
   * 默认：default 成功：warnnig 失败：error 警告：warnning
   */
  status?: Omit<DesignTypes['Status'], 'priamry'>;

  type?: 'default' | 'primary' | 'secondary' | 'text'
  /**
   * 是否为禁用状态
   * 默认为false
   * 为true onClick 不能使用
   */
  disabled?: boolean,
  /**
   * 按钮前缀
   */
  prefix?: React.ReactNode,
  /**
   * 按钮后缀
   */
  suffix?: React.ReactNode,
  /**
   * 当buttonShowType为text 是否显示下划线
   * 默认：false
   */
  underline?: boolean,
  icon?: ReactNode
}

export type ButtonPropsType = ButtonBaseType & Omit<JSX.IntrinsicElements['button'], 'type'> 