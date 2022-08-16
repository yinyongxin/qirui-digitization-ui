import React, { PropsWithChildren } from "react"
import { DesignTypes } from "../typings";

export interface ButtonBaseType {
  /**
   * 三个大小  
   * 默认：default 小：small 大：large
   */
  size?: DesignTypes['Size'];
  /**
   * 两种级别的按钮 
   * 主要：main一般用于确认 
   * 次要：secondary一般用于取消
   */
  level?: DesignTypes['Level'] | 'white';
  /**
   * 状态 
   * 默认：default 成功：warnnig 失败：error 警告：warnning
   */
  status?: DesignTypes['Status'];
  /**
   * 按钮类型 默认： default  文字：text
   */
  buttonShowType?: DesignTypes['ButtonShowType']
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
  textBottomLine?: boolean
}

export type ButtonPropsType = ButtonBaseType & JSX.IntrinsicElements['button']