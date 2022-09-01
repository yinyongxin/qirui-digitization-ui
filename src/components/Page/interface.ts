import React, { ReactNode } from "react"
import { BreadcrumbBaseType } from "../Breadcrumb/interface";
import { DesignTypes } from "../typings";

export interface PageBaseType {
  /**
   * √
   * page头部
   */
  pageHeader?: {
    /**
     * √
     * 面包屑
     */
    breadcrumb?: BreadcrumbBaseType
    /**
     * √
     * 标题
     */
    title?: ReactNode,
    /**
     * √
     * 描述
     */
    descriptions?: ReactNode

    /**
     * √
     * 返回上一步
     * @defaultValue false
     */
    toBack?: boolean,
    /**
     * √
     * 头部内联样式
     */
    style?: React.CSSProperties,
    padding?: DesignTypes['Padding']
  },
  pageBody?: {
    padding?: DesignTypes['Padding']
  }
  /**
   * √
   * 吸顶
   */
  sticky?: boolean
}

export type PagePropsType = PageBaseType & JSX.IntrinsicElements['div']