import React, { PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings";

/**
 * @title EllipsisConfig
 */
export type EllipsisConfig = {
  /**
   * @zh 自动溢出省略（只支持字符串），在大量使用情况下建议开启提高性能。
   * @en Automatic overflow omission (only strings are supported). In the case of simple single-line, css will be used by default to handle ellipsis to avoid complicated calculations.
   * @defaultValue false
   * @version `2.36.0` 将默认值改为 `false` 并支持多行CSS省略。
   */
  cssEllipsis?: boolean;
  /**
   * @zh 显示省略的行数
   * @en The number of omitted rows
   * @defaultValue 1
   */
  rows?: number;
  /**
   * @zh 显示展开/折叠按钮
   * @en Whether to support expand
   */
  expandable?: boolean;
  /**
   * @zh 省略号
   * @en ellipsis string
   * @defaultValue ...
   */
  ellipsisStr?: string;
  /**
   * @zh 后缀
   * @en Suffix
   */
  suffix?: string;
  /**
   * @zh 配置 折叠 / 展开 的元素
   * @en Configure expand elements
   */
  expandNodes?: ReactNode[];
  /**
   * @zh 在省略发生改变的时候触发，通常是窗口resize情况会触发。
   * @en Callback when the ellipsis state changes, usually triggered by window resize。
   */
  onEllipsis?: (isEllipsis: boolean) => void;
  /**
   * @zh 在折叠/展开状态发生改变的时候触发，通常是点击折叠/展开按钮触发。
   * @en Callback when the expand state changes, usually triggered by clicking the button
   * @version e in `2.27.0`
   */
  onExpand?: (isExpand: boolean, e: any) => void;
  /**
   * @zh 配置省略时的弹出框
   * @en Show Tooltip when configure ellipsis
   */
  showTooltip?: boolean | { type?: 'tooltip' | 'popover'; props?: Record<string, any> };
  /**
   * @zh 是否展开
   * @en whether to expand
   * @version `2.33.0`
   */
  expanded?: boolean;
  /**
   * @zh 默认展开
   * @en Default expanded state
   * @version `2.33.0`
   * @defaultValue false
   */
  defaultExpanded?: boolean;
};

export interface OperationsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'className'> {
  /**
   * @zh 开启复制功能
   * @en Whether to be copyable
   * @version `onCopy` params `e` in `2.31.0`
   */
  copyable?:
  | boolean
  | {
    text?: string;
    onCopy?: (text: string, e: any) => void;
    icon?: ReactNode;
    tooltips?: [ReactNode, ReactNode];
  };
  /**
   * @zh 开启可编辑功能
   * @en If editable. Can control edit state when is object
   * @version `onStart` params `e` in `2.31.0`
   */
  editable?:
  | boolean
  | {
    editing?: boolean;
    onStart?: (text: any, e: any) => void;
    onChange?: (text: any) => void;
    onEnd?: (text: any) => void;
  };
  /**
   * @zh 自动溢出省略（只支持字符串），具体参数配置看 [EllipsisConfig](#ellipsisconfig)
   * @en Auto overflow omitted, see [EllipsisConfig](#ellipsisconfig)
   */
  ellipsis?: boolean | EllipsisConfig;
  isEllipsis?: boolean;
  expanding?: boolean;
  onClickExpand?: (e: any) => void;
  setEditing?: (editing: boolean) => void;
  forceShowExpand?: boolean;
}