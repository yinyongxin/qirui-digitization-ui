import React, { PropsWithChildren } from "react"
import { DesignTypes } from "../typings";

export interface IconBaseType {
  /**
   * icon大小
   * 默认：16
   */
  size?: number | 'inherit';
  /**
   * 状态 
   * 默认：default 成功：success 失败：error 警告：warnning
   */
  status?: DesignTypes['Status'] | 'primary';
   /**
   * 类型
   * solid：实体
   * regular：空心
   */
  type?: 'solid' | 'regular',
  iconStyle?: React.CSSProperties,
  icon: string,
}

export type IconPropsType = IconBaseType & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>