import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles } from "#/utils/tools"
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
    size,
    className = '',
    ...rest
  } = props

  const classNamesObj = {
    icon: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      `fa-${type}`,
      `fa-${icon}`,
      `${prefixCls}-${status}`,
      className,
      ...classNames
    ])
  }

  return (
    <i
      className={classNamesObj.icon()}
      style={getStyles([
        style,
        {
          style: {
            fontSize: size,
          },
          condition: !!size
        }
      ])}
      {...rest}
    />
  )
}
export default Icon