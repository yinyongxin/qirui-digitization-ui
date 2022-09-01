import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { getClassNames, getStyles, isBoolean, isString } from "../utils/tools"
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
    mark,
    disabled,
    ...rest
  } = props

  const classNamesObj = {
    text: getClassNames([
      `${prefixCls}`,
      `${prefixCls}-level-${level}`,
      {
        [`${classNamePrefix}-font-${type}`]: !disabled,
        [`${prefixCls}-underline`]: underline,
        [`${prefixCls}-delete`]: deleteProps,
        [`${prefixCls}-mark`]: mark && isString(mark),
        [`${classNamePrefix}-bg-${mark}`]: mark && isString(mark),
        [`${classNamePrefix}-base-disabled`]: disabled,
      },
      className,
    ])
  }

  const getChildren = () => {

  }

  const stylesObj = {
    text: getStyles([
      style,
      {
        style: {
          backgroundColor: !isString(mark) && mark?.color || ''
        },
        condition: !isString(mark) && !!mark?.color
      }
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