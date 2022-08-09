import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { getClassNames } from "../utils/tools"
import { IconPropsType } from "./interface"

const Icon: FC<IconPropsType> = (props, ref) => {


  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-icon`

  const {
    status = 'default',
    type = 'solid',
    icon = '',
    iconStyle,
    size = 16,
    ...rest
  } = props

  const iconClassName = getClassNames([
    `${prefixCls}`,
    `fa-${type}`,
    `fa-${icon}`,
    `${prefixCls}-${status}`
  ])

  return (
    <i
      className={iconClassName}
      style={{
        fontSize: size,
        ...iconStyle
      }}
      {...rest}
    />
  )
}
export default Icon