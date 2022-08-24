import React, { FC, useContext, useEffect, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { getClassNames, omit } from "../utils/tools"
import { SideMenuItemSubPropsType, SidePropsType } from "./interface"
import { SideMenuComtext } from "./SideMenuComtext"

const SideMenuItemSub: FC<SideMenuItemSubPropsType> = (props, ref) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-sideMenuItemSub`

  const {
    activeMenuSubChange,
    activeMenuSub,
    onMenuSubClick,
    setActiveMenuSub
  } = useContext(SideMenuComtext);

  const {
    title,
    icon,
    activeKey,
    children,
    render,
    index
  } = props

  const isIn = !!activeMenuSub.find((item) => item === activeKey)

  const handleClick = () => {
    let actives = []
    let newProps = omit(props, ['children'])
    if (isIn) {
      actives = [...new Set(activeMenuSub.filter(item => item !== activeKey))]
      setOpen(!open)
    } else {
      actives = [...new Set([...activeMenuSub, activeKey])]
      setOpen(!open)
    }
    setActiveMenuSub && setActiveMenuSub(actives)
    onMenuSubClick && onMenuSubClick(newProps)
    activeMenuSubChange && activeMenuSubChange(actives, newProps)
  }

  const [open, setOpen] = useState(isIn)

  const sideMenuItemSubClassName = getClassNames([
    `${prefixCls}`,
  ])

  return (
    <div>
      {render ? (
        render(props, isIn, { index })
      ) : (
        <>
          <div
            style={{ paddingLeft: 17 + index * 8 }}
            className={sideMenuItemSubClassName}
            onClick={handleClick}
          >
            {icon && (
              <Icon icon={icon} />
            )}
            <span className={`${prefixCls}-title`}>{title}</span>
            <Icon size={14} icon={!open ? 'angle-right' : 'angle-down'} />
          </div>
          <div style={{ display: open ? 'unset' : 'none' }}>
            {children && children}
          </div>
        </>
      )}
    </div>
  )
}
export default SideMenuItemSub