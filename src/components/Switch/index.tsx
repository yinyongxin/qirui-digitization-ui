import React, { FC, useContext, useEffect, useState, useTransition } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles } from "#/utils/tools"
import { SwitchPropsType } from "./interface"

const Switch: FC<SwitchPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-switch`

  const {
    className,
    type = 'circle',
    size = 'default',
    defaultChecked = false,
    checked: checkedProps,
    checkedText,
    uncheckedText,
    onChange,
    disabled,
    ...rest
  } = props

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(checkedProps || defaultChecked)
  }, [checkedProps])

  const classNamesObj = {
    switch: getClassNames([
      `${prefixCls}`,
      `${prefixCls}-type-${type}`,
      `${prefixCls}-size-${size}`,
      {
        [`${prefixCls}-checked`]: checked,
        [`${prefixCls}-disabled`]: disabled,
      },
      className,
    ]),
    dot: getClassNames([
      `${prefixCls}-dot`,
      `${prefixCls}-dot-${size}-${type}`,
      {
        [`${prefixCls}-dot-${size}-${type}-checked`]: checked
      }
    ]),
    checkedText: getClassNames([
      `${prefixCls}-text`,
      `${prefixCls}-text-${size}`,
      `${prefixCls}-checkedText-${size}`,
      {
        [`${prefixCls}-text-checked`]: checked
      }
    ]),
    uncheckedText: getClassNames([
      `${prefixCls}-text`,
      `${prefixCls}-text-${size}`,
      `${prefixCls}-uncheckedText-${size}`,
      {
        [`${prefixCls}-text-checked`]: checked
      }
    ]),
  }

  const checkedTextRender = () => {
    return checked && (
      <div className={classNamesObj.checkedText}>{checkedText}</div>
    )
  }
  const uncheckedTextRender = () => {
    return !checked && (
      <div className={classNamesObj.uncheckedText}>{uncheckedText}</div>
    )
  }

  return (
    <button
      className={classNamesObj.switch}
      {...rest}
      onClick={(e) => {
        if (!disabled) {
          onChange?.(!checked, e)
          setChecked(!checked)
        }
      }}
    >
      {checkedTextRender()}
      <div className={classNamesObj.dot}></div>
      {uncheckedTextRender()}
    </button>
  )
}
export default Switch