import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { getClassNames, getStyles } from "../utils/tools"
import { TextPropsType } from "./interface"

const Text = (props: TextPropsType) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-text`

  const {
    style,
    className,
    children,
    underline,
    delete: deleteProps,
    type = 'default',
    level = 3,
    ...rest
  } = props

  const classNamesObj = {
    text: getClassNames([
      `${prefixCls}`,
      `${classNamePrefix}-font-${type}`,
      `${prefixCls}-level-${level}`,
      {
        [`${prefixCls}-underline`]: underline,
        [`${prefixCls}-delete`]: deleteProps,
      },
      className,
    ])
  }

  const getChildren = () => {

  }

  const stylesObj = {
    text: getStyles([
      style
    ])
  }

  return (
    <span
      className={classNamesObj.text}
      style={stylesObj.text}
      {...rest}
    >
      {children}
    </span>
  )
}
export default Text