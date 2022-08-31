import { type } from "os";
import React, { PropsWithChildren, ReactNode } from "react"
import { To } from "react-router-dom";
import { DesignTypes } from "../typings";

export type BreadcrumbItemType = {
  path?: To,
  title: string,
}

export interface BreadcrumbBaseType {
  list: BreadcrumbItemType[]
  /**
   * @zh 指定分割符
   * @en Custom separator
   * @defaultValue <IconObliqueLine />
   */
  separator?: string | ReactNode;
}

export type BreadcrumbPropsType = BreadcrumbBaseType & JSX.IntrinsicElements['div']