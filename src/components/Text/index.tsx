import React, { Children, FC, MouseEventHandler, useContext, useEffect, useState } from "react"
import Button from "../Button"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { useData } from "../utils/hooks"
import { getClassNames, getStyles, clipboard, isString, isBoolean } from "../utils/tools"
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
    comp: getClassNames([
      `${prefixCls}`,
      `${classNamePrefix}-font-level-${level}`,
      {
        [`${classNamePrefix}-font-${type}`]: !disabled,
        [`${prefixCls}-underline`]: underline,
        [`${prefixCls}-delete`]: deleteProps,
        [`${classNamePrefix}-base-disabled`]: disabled,
      },
      className,
    ]),
    text: getClassNames([
      {
        [`${prefixCls}-mark`]: mark && isString(mark),
        [`${classNamePrefix}-bg-${mark}`]: mark && isString(mark),
      }
    ]),
    copyable: getClassNames([
      `${prefixCls}-copyable`,
    ])
  }

  const stylesObj = {
    text: getStyles([
      {
        style: {
          backgroundColor: !isString(mark) && mark?.color || ''
        },
        condition: !isString(mark) && !!mark?.color
      }
    ])
  }

  /**
   * 点击复制按键
   * @param event MouseEvent
   */
  const copyableHandle = async (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!isCopyable) {
      let copyableText: string = children as string
      if (!isBoolean(copyable)) {
        copyable?.text && (copyableText = copyable?.text)
        copyable?.onCopy?.(copyableText, event)
      }
      clipboard(copyableText).then(() => {
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
        {!isBoolean(copyable) && copyable?.icon}
        {isBoolean(copyable) && (
          <Icon status={isCopyable ? 'success' : 'default'} icon={isCopyable ? 'circle-check' : 'copy'} />
        )}
      </span>
    )
  }




  useEffect(() => {
    return () => {
      clearTimeout(data.resetIsCopyableId!)
    }
  }, [])

  return (
    <span
      className={classNamesObj.comp}
      style={style}
      {...rest}
    >
      <span style={stylesObj.text} className={classNamesObj.text}>
        {children}
      </span>
      {copyable && copyableRender()}
    </span>
  )
}
export default Text