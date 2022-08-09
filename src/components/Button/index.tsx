import React, { FC, useContext } from "react"
import { GlobalContext } from "../config/globalContext"
import { DesignTypes } from "../typings"
import { getClassNames } from "../utils/tools"
import { ButtonPropsType } from "./interface"

const Button: FC<ButtonPropsType> = (props) => {

  const {
    ButtonConfig,
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-button`

  const {
    children,
    status = 'default',
    size,
    buttonShowType = 'default',
    level = 'main',
    disabled = false,
    prefix,
    suffix,
    textBottomLine = false,
    onClick,
    ...rest
  } = {
    ...ButtonConfig,
    ...props
  }

  /**
   * button不同模式下的className
   */
  const buttonShowTypes: Record<DesignTypes['ButtonShowType'], string> = {
    // 默认按钮样式
    default: getClassNames([
      `${prefixCls}`,
      `${prefixCls}-size-${size}`,
      !disabled ? `${prefixCls}-status-${status}` : `${prefixCls}-disabled`,
      `${prefixCls}-level-${level}`,
      `${prefixCls}-buttonShowType-${buttonShowType}`,
    ]),
    // 文字按钮样式
    text: getClassNames([
      `${prefixCls}`,
      `${prefixCls}-buttonShowType-text-base`,
      !disabled ? `${prefixCls}-buttonShowType-text` : `${prefixCls}-buttonShowType-text-disabled`,
    ]),
  }

  const bottomLine = buttonShowType === 'text' ? getClassNames([
    textBottomLine ? `${prefixCls}-line-base` : '',
    !disabled ? `` : `${prefixCls}-line-base-disabled`,
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
      className={buttonShowTypes[buttonShowType]}
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