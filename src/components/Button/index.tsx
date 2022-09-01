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
    className,
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
      `${prefixCls}-level-${level}`,
      `${prefixCls}-buttonShowType-${buttonShowType}`,
      {
        [`${prefixCls}-font-status-${status}`]: !disabled,
        [`${prefixCls}-font-status-${status}-hover`]: !disabled,

        [`${prefixCls}-bg-status-${status}`]: !disabled,
        [`${prefixCls}-bg-status-${status}-hover`]: !disabled,

        [`${prefixCls}-border-status-${status}`]: !disabled,
        [`${prefixCls}-border-status-${status}-hover`]: !disabled,

        [`${prefixCls}-font-disabled`]: disabled,
        [`${prefixCls}-bg-disabled`]: disabled,
        [`${prefixCls}-border-disabled`]: disabled,
        [`${prefixCls}-font-disabled-hover`]: disabled,
        [`${prefixCls}-bg-disabled-hover`]: disabled,
        [`${prefixCls}-border-disabled-hover`]: disabled,
      },
      className
    ]),
    // 文字按钮样式
    text: getClassNames([
      `${prefixCls}`,
      `${prefixCls}-buttonShowType-text-base`,
      {
        [`${prefixCls}-buttonShowType-text`]: !disabled,
        [`${prefixCls}-buttonShowType-text-disabled`]: disabled
      },
      className
    ]),
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