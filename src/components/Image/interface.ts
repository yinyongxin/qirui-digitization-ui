import React, { PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings";

export interface ImageBaseInterface {
  imgAttributes?: JSX.IntrinsicElements['img'],
  /**
   * 	是否开启预览
   */
  preview?: boolean,
  /**
   * 收起查看框
   * 	是否开启简洁模式
   */
  simple?: boolean,
  /**
   * 使用 Image.PreviewGroup包裹时的预览索引，一般不用指定，当多图预览顺序出现问题时，可手动指定当前 image 的预览顺序
   */
  index?: number,
  /**
   * 描述
   */
  description?: string,
  /**
   * 标题
   */
  title?: string,
  /**
   * error 状态下显示的内容
   */
  error?: ReactNode,
  /**
   * 加载过渡效果，为 true 显示默认加载效果
   */
  loader?: boolean | ReactNode,

  /**
   * 图片底部
   */
  footer?: {
    content: ReactNode,
    position?: 'inner' | 'outer'
  },
  /**
   * 操作显示方式
   */
  optionsShow?: 'never' | 'hover' | 'always'
  /**
   * 操作自定义
   */
  optionsRender?: () => ReactNode
  /**
   * 关闭触发事件
   */
  onClose?: () => void,
  /**
   * 关闭按钮定义渲染
   */
  closeRender?: () => ReactNode,
  /**
   * 是否显示关闭按钮
   */
  closeShow?: 'never' | 'hover' | 'always',
  /**
   * 是否显示遮罩
   */
  mask?: boolean
}

export type ImagePropsType = ImageBaseInterface