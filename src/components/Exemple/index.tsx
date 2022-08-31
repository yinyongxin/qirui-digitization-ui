import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { getClassNames, getStyles } from "../utils/tools"
import { ExemplePropsType } from "./interface"

const Exemple = (props: ExemplePropsType) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-exemple`

  const {
    style,
    className,
    children,
    ...rest
  } = props

  const classNamesObj = {
    exemple: getClassNames([
      `${prefixCls}`,
      className,
    ])
  }

  const stylesObj = {
    exemple: getStyles([
      style
    ])
  }

  return (
    <div
      className={classNamesObj.exemple}
      style={stylesObj.exemple}
      {...rest}
    >
      {children}
    </div>
  )
}
export default Exemple