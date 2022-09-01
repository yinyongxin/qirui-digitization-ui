import React, { FC, useContext } from "react"
import { GlobalContext } from "../config/globalContext"
import { DesignTypes } from "../typings"
import { getClassNames, getValueIfQualified } from "../utils/tools"
import { ButtonPropsType } from "./interface"

const Button: FC<ButtonPropsType> = (props) => {

  const {
    ButtonConfig,
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-button`


  const {
    status = 'default',
    buttonShowType = 'default',
    children,
    size,
    disabled = false,
    prefix,
    suffix,
    className,
    textBottomLine = false,
    onClick,
    ...rest
  } = {
    ...ButtonConfig,
    ...props
  }

  const defaultBtn = getValueIfQualified(
    [
      `${prefixCls}-size-${size}`,
      ...(getValueIfQualified(
        [
          `${prefixCls}-font-${status}`,
          `${prefixCls}-font-${status}-hover`,

          `${prefixCls}-bg-${status}`,
          `${prefixCls}-bg-${status}-hover`,

          `${prefixCls}-border-${status}`,
          `${prefixCls}-border-${status}-hover`,
        ],
        [!disabled]
      ) || []),
    ],
    [buttonShowType === 'default']
  ) || []

  const textBtn = getValueIfQualified([
    `${prefixCls}-border-text`,
    `${prefixCls}-bg-text`,
    ...(getValueIfQualified([
      `${prefixCls}-border-text`,
      `${prefixCls}-bg-text`,
      `${prefixCls}-font-${status}`,
      `${prefixCls}-font-${status}-hover`,
    ], [!disabled]) || []),
  ], buttonShowType === 'text') || []

  const classNamesObj = {
    comp: getClassNames([
      `${prefixCls}`,
      ...defaultBtn,
      ...textBtn,
      ...(getValueIfQualified(
        [
          `${prefixCls}-disabled`,
          `${prefixCls}-font-disabled`,
          `${prefixCls}-bg-disabled`,
          `${prefixCls}-border-disabled`,
        ],
        [disabled]
      ) || []),
      className
    ])
  }

  const bottomLine = buttonShowType === 'text' ? getClassNames([
    {
      [`${prefixCls}-line-base`]: textBottomLine,
      [`${prefixCls}-line-base-disabled`]: disabled
    },
  ]) : ''

  /**
   * 点击事件处理
   * @param event 
   */
  const handleClick: React.MouseEventHandler<HTMLElement> = (event: any): void => {
    !disabled && onClick && onClick(event)
  };

  return (
    <button
      className={classNamesObj.comp}
      onClick={handleClick}
      {...rest}
    >
      {/* 前缀 */}
      {prefix && (
        <div>{prefix}</div>
      )}
      {/* 主体 */}
      {children && (
        <div className={bottomLine}>{children}</div>
      )}
      {/* 后缀 */}
      {suffix && (
        <div>{suffix}</div>
      )}
    </button>
  )
}
export default Button