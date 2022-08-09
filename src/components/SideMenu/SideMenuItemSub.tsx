import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { getClassNames } from "../utils/tools"
import omit from "../utils/tools/omit"
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
    render
  } = props

  const isIn = !!activeMenuSub.find((item) => item === activeKey)

  const handleClick = () => {
    let actives = []
    let newProps = omit(props, ['children'])
    if (isIn) {
      actives = activeMenuSub.filter(item => item !== activeKey)
      setOpen(false)
    } else {
      actives = [...activeMenuSub, activeKey]
      setOpen(true)
    }
    setActiveMenuSub && setActiveMenuSub(actives)
    onMenuSubClick && onMenuSubClick(newProps)
    activeMenuSubChange && activeMenuSubChange(actives, newProps)
  }


  const [open, setOpen] = useState(!!activeMenuSub.find((item) => item === activeKey))

  const sideMenuItemSubClassName = getClassNames([
    `${prefixCls}`,
  ])

  return (
    <div>
      {render ? (
        render(props, isIn)
      ) : (
        <>
          <div className={sideMenuItemSubClassName} onClick={handleClick} >
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