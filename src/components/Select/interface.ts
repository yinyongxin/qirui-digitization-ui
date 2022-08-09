import React, { PropsWithChildren } from "react"
import { DesignTypes } from "../typings";

export interface SelectBaseType {
  options: DesignTypes['Option'][],
  onValueChange?: (newValue: DesignTypes['Option']['value'] | DesignTypes['Option']['value'][] | undefined) => void,
  maxShow?: number
}

export type SelectPropsType = PropsWithChildren<SelectBaseType> & JSX.IntrinsicElements['input']