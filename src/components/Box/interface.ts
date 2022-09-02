import React, { PropsWithChildren } from "react"
import { DesignTypes } from "../typings";

export interface BoxBaseType {
  type?: 'base' | 'blur'
}

export type BoxPropsType = BoxBaseType & JSX.IntrinsicElements['div']