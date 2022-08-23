import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames } from "../utils/tools"
import { MaskPropsType } from "./interface"

const Mask: FC<MaskPropsType> = (props, ref) => {


  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-mask`

  const {
    zIndex = 1000,
    children,
    className = '',
    visible = true,
    clickThrough = false,
    style = {},
    animation = true,
    ...rest
  } = props

  const classNamesObj = {
    mask: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      className,
      {
        'pointer-events-none': clickThrough,
        [`${prefixCls}-animation`]: animation,
      },
      ...classNames
    ])
  }

  return (
    <>
      {visible ? (
        <div style={{ zIndex, ...style }} className={classNamesObj.mask()} {...rest}>
          {children && children}
        </div>
      ) : (<></>)}
    </>
  )
}
export default Mask