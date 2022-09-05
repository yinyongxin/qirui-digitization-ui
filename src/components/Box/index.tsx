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
    shadow = 'base',
    shadowShow = 'never',
    children,
    type,
    radius = 0,
    blur = 10,
    ...rest
  } = props

  const classNamesObj = {
    box: getClassNames([
      `${prefixCls}`,
      {
        [`${classNamePrefix}-shadow-blur`]: type === 'blur',
        [`${classNamePrefix}-shadow-${shadow}`]: shadowShow === 'always',
        [`${classNamePrefix}-shadow-${shadow}-hover`]: shadowShow === 'hover',
      },
      className,
    ]),
  }

  const stylesObj = {
    box: getStyles([
      style,
      {
        backdropFilter: `blur(${blur}px)`,
      },
      {
        style: {
          borderRadius: radius,
          overflow: 'hidden',
        },
        condition: !!radius
      }
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