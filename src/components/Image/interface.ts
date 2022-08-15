import React, { PropsWithChildren } from "react"
import { DesignTypes } from "../typings";

export interface ImageBaseInterface {
  imgProps?: JSX.IntrinsicElements['img']
}

export type ImagePropsType = ImageBaseInterface