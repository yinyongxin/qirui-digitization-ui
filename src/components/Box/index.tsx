import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { getClassNames, getStyles } from "../utils/tools"
import { BoxPropsType } from "./interface"

const Box = (props: BoxPropsType) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-box`

  const {
    style,
    className,
    children,
    ...rest
  } = props

  const classNamesObj = {
    box: getClassNames([
      `${prefixCls}`,
      className,
    ])
  }

  const stylesObj = {
    box: getStyles([
      style
    ])
  }

  return (
    <div
      className={classNamesObj.box}
      style={stylesObj.box}
      {...rest}
    >
      {children}
    </div>
  )
}
export default Box