import React, { CSSProperties, PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings";

export interface TagBaseType {
  style?: CSSProperties;
  className?: string;
  /**
   * @zh 设置标签背景颜色
   * @en The background color of Tag
   */
  color?: string;
  /**
   * @zh 是否显示边框
   * @en Whether the tag is bordered
   * @version 2.26.0
   */
  bordered?: Boolean;
  size?: DesignTypes['Size'];
  visible?: boolean;
  closable?: boolean;
  onClose?: (e: any) => void;
  checkable?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheck?: (checked: any) => void
}

export type TagPropsType = PropsWithChildren<TagBaseType>