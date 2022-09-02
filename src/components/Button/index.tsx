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
    status,
    type: typeProps,
    children,
    size,
    disabled = false,
    prefix,
    suffix,
    className,
    underline = false,
    border = true,
    icon,
    onClick,
    ...rest
  } = {
    ...ButtonConfig,
    ...props
  }

  const type = (typeProps === 'text' ? '' : typeProps) || status || 'default'

  const classNamesObj = {
    comp: getClassNames([
      `${prefixCls}`,
      `${prefixCls}-font-${type}`,
      {
        [`${prefixCls}-size-${size}${(icon && !children) ? '-icon' : ''}`]: typeProps !== 'text',
        [`${prefixCls}-bg-${type}-hover`]: typeProps !== 'text' && !disabled,
        [`${prefixCls}-underline`]: typeProps === 'text' && underline,
        [`${prefixCls}-font-${type}-hover`]: !disabled,
        [`${prefixCls}-border-${type}-hover`]: !disabled,
        [`${prefixCls}-border-none`]: !border || typeProps === 'text',
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-border-${type}`]: typeProps !== 'text',
        [`${prefixCls}-bg-${type}`]: typeProps !== 'text',
        [`${prefixCls}-bg-text`]: typeProps === 'text',
      },
      className
    ])
  }

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

      {/* 图标 */}
      {icon && (
        <div>
          {icon}
        </div>
      )}

      {/* 主体 */}
      {children && (
        <div>
          {children}
        </div>
      )}
      {/* 后缀 */}
      {suffix && (
        <div>{suffix}</div>
      )}
    </button>
  )
}
export default Button