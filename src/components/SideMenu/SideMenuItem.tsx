import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { getClassNames } from "../utils/tools"
import { SideMenuItemPropsType } from "./interface"
import { SideMenuComtext } from "./SideMenuComtext"

const SideMenuItem: FC<SideMenuItemPropsType> = (props, ref) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const {
    activeMenu,
    activeMenuItemChange,
    onMenuItemClick,
    setActiveMenu
  } = useContext(SideMenuComtext);

  const prefixCls = `${classNamePrefix}-sideMenuItem`

  const {
    title,
    icon,
    activeKey,
    render
  } = props

  const handleClick = () => {
    setActiveMenu && setActiveMenu([activeKey])
    activeMenuItemChange && activeMenuItemChange([activeKey], props)
    onMenuItemClick && onMenuItemClick(props)
  }

  const isActive = !!activeMenu.find((item) => item === activeKey)

  const sideMenuItemClassName = getClassNames([
    `${prefixCls}`,
    {
      [`${prefixCls}-active`]: isActive
    }
  ])

  return (
    <div onClick={handleClick}>
      {render ? (
        render(props, isActive)
      ) : (
        <div className={sideMenuItemClassName} >
          {icon && (
            <Icon icon={icon} />
          )}
          <span className={`${prefixCls}-title`}>{title}</span>
        </div>
      )}
    </div>
  )
}
export default SideMenuItem