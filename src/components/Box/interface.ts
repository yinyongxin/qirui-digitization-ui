import React, { PropsWithChildren } from "react"
import { DesignTypes } from "../typings";

export interface BoxBaseType {
  borderDirection?: DesignTypes['Direction'][],
  borderStatus?: DesignTypes['Status'][],
  fontStatus: DesignTypes['Status'][]
  backgroundColor: DesignTypes['Status'][]
}

export type BoxPropsType = BoxBaseType & JSX.IntrinsicElements['div']