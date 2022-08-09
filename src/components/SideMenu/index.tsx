import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { getClassNames } from "../utils/tools"
import { ActiveKeyType, MenuTreeItemType, SideMenuPropsType } from "./interface"
import { SideMenuComtext } from "./SideMenuComtext"
import SideMenuItem from "./SideMenuItem"
import SideMenuItemSub from "./SideMenuItemSub"

const SideMenu: FC<SideMenuPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const {
    defaultActiveKeys,
    defaultOpenKeys,
    menuTree,
    activeMenuItemChange,
    activeMenuSubChange,
    onMenuItemClick,
    onMenuSubClick
  } = props

  const [activeMenu, setActiveMenu] = useState(defaultActiveKeys || [])
  const [activeMenuSub, setActiveMenuSub] = useState(defaultOpenKeys || [])

  const prefixCls = `${classNamePrefix}-sideMenu`

  // const activeMenuTiemChangeHandle = (activeKeys: ActiveKeyType[]) => {
  //   setActiveMenu(activeKeys)
  //   activeMenuItemChange && activeMenuItemChange(activeKeys)
  // }
  // const activeMenuSubChangeHandle = (activeKeys: ActiveKeyType[]) => {
  //   setActiveMenuSub(activeKeys)
  //   activeMenuSubChange && activeMenuSubChange(activeKeys)
  // }

  const getMenus = (arrs: MenuTreeItemType[]) => {
    return arrs.map(arr => {
      if (arr.children && arr.children.length !== 0) {
        const {
          children,
          ...sideMenuItemSubProps
        } = arr
        return (
          <SideMenuItemSub {...sideMenuItemSubProps} key={sideMenuItemSubProps.activeKey}>
            {getMenus(children)}
          </SideMenuItemSub>
        )
      }
      return (
        <SideMenuItem {...arr} key={arr.activeKey} />
      )
    })
  }

  const sideMenuClassName = getClassNames([
    `${prefixCls}`,
  ])

  return (
    <SideMenuComtext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        activeMenuItemChange,
        activeMenuSub,
        setActiveMenuSub,
        activeMenuSubChange,
        onMenuItemClick,
        onMenuSubClick
      }}
    >
      <aside className={sideMenuClassName}>
        {getMenus(menuTree)}
      </aside>
    </SideMenuComtext.Provider>

  )
}
export default SideMenu