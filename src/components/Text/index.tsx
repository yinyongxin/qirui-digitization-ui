import React, { FC, useContext, useEffect, useState } from "react"
import Button from "../Button"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { useData } from "../utils/hooks"
import { getClassNames, getStyles, clipboard, isString } from "../utils/tools"
import { TextPropsType } from "./interface"

const Text = (props: TextPropsType) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-text`

  const [isCopyable, setIsCopyable] = useState(false)

  const data = useData<{
    resetIsCopyableId: NodeJS.Timeout | null
  }>({
    resetIsCopyableId: null
  })

  const {
    style,
    className,
    children,
    underline,
    delete: deleteProps,
    type = 'default',
    level = 5,
    mark,
    disabled,
    copyable,
    ...rest
  } = props

  const classNamesObj = {
    text: getClassNames([
      `${prefixCls}`,
      `${classNamePrefix}-font-level-${level}`,
      {
        [`${classNamePrefix}-font-${type}`]: !disabled,
        [`${prefixCls}-underline`]: underline,
        [`${prefixCls}-delete`]: deleteProps,
        [`${prefixCls}-mark`]: mark && isString(mark),
        [`${classNamePrefix}-bg-${mark}`]: mark && isString(mark),
        [`${classNamePrefix}-base-disabled`]: disabled,
      },
      className,
    ]),
    copyable: getClassNames([
      `${prefixCls}-copyable`,
    ])
  }

  const copyableHandle = async () => {
    if (!isCopyable) {
      clipboard(children as string).then(() => {
        setIsCopyable(true)
      })
      data.resetIsCopyableId = setTimeout(() => {
        setIsCopyable(false)
        clearTimeout(data.resetIsCopyableId!)
      }, 2000)
    }
  }

  const copyableRender = () => {
    return (
      <span
        className={classNamesObj.copyable}
        onClick={copyableHandle}
      >
        <Icon status={isCopyable ? 'success' : 'default'} icon={isCopyable ? 'circle-check' : 'copy'} />
      </span>
    )
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

  useEffect(() => {
    return () => {
      clearTimeout(data.resetIsCopyableId!)
    }
  }, [])

  return (
    <span
      className={classNamesObj.text}
      style={stylesObj.text}
      {...rest}
    >
      {children}
      {copyable && copyableRender()}
    </span>
  )
}
export default Text