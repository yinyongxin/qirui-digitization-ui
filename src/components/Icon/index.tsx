import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames } from "../utils/tools"
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
    style,
    size = 16,
    ...rest
  } = props

  const classNamesObj = {
    icon: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      `fa-${type}`,
      `fa-${icon}`,
      `${prefixCls}-${status}`,
      ...classNames
    ])
  }

  return (
    <i
      className={classNamesObj.icon()}
      style={{
        fontSize: size,
        ...style
      }}
      {...rest}
    />
  )
}
export default Icon