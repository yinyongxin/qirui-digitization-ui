import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames } from "../utils/tools"
import omit from "../utils/tools/omit"
import { ImagePropsType } from "./interface"

const Image: FC<ImagePropsType> = (props, ref) => {


  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-image`

  const {
    imgProps = {},
    ...rest
  } = props

  const classNamesObj = {
    imageComponent: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      ...classNames
    ]),
    img: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-img`,
      'imgProps',
      ...classNames
    ])
  }

  return (
    <div className={classNamesObj.imageComponent()}>
      <img style={{ ...imgProps?.style }} className={classNamesObj.img()} {...omit(imgProps, ['style',])} />
    </div>
  )
}
export default Image