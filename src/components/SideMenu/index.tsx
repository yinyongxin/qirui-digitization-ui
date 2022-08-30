import { forwardRef, ForwardRefRenderFunction, Key, useContext, useEffect, useImperativeHandle, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { getClassNames, getStyles } from "../utils/tools"
import { MenuTreeItemType, SideMenuHandleType, SideMenuPropsType } from "./interface"
import { SideMenuComtext } from "./SideMenuComtext"
import SideMenuItem from "./SideMenuItem"
import SideMenuItemSub from "./SideMenuItemSub"

const SideMenu: ForwardRefRenderFunction<unknown, SideMenuPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-sideMenu`

  const {
    defaultActiveKeys,
    defaultOpenKeys,
    menuTree,
    activeMenuItemChange,
    activeMenuSubChange,
    onMenuItemClick,
    onMenuSubClick,
    allOpen = false,
    className,
    style,
    width = 220,
    borders = [],
    children
  } = props


  const getAllMenuSub = (arrs: MenuTreeItemType[], resArr: Key[]) => {
    let newArr = resArr
    arrs.forEach(arr => {
      if (arr.children && arr.children.length !== 0) {
        newArr.push(arr.activeKey)
        getAllMenuSub(arr.children, newArr)
      }
    })
    return newArr
  }

  const [activeMenu, setActiveMenu] = useState(defaultActiveKeys || [])
  const [activeMenuSub, setActiveMenuSub] = useState((allOpen ? getAllMenuSub(menuTree, []) : defaultOpenKeys) || [])

  /**
   * 
   * @param arrs 获取组件树递归方法
   * @returns 
   */
  function getMenus(arrs: MenuTreeItemType[], index = 0) {
    index += 1
    return arrs?.map(arr => {
      if (arr.children && arr.children.length !== 0) {
        const {
          children,
          ...sideMenuItemSubProps
        } = arr
        return (
          <SideMenuItemSub {...sideMenuItemSubProps} key={sideMenuItemSubProps.activeKey} index={index}>
            {getMenus(children, index)}
          </SideMenuItemSub>
        )
      }
      return (
        <SideMenuItem {...arr} key={arr.activeKey} index={index} />
      )
    })
  }


  const classNamesObj = {
    sideMenu: getClassNames([
      `${prefixCls}`,
      className,
      ...borders.map(border => `${prefixCls}-border-${border}`)
    ])
  }

  const stylesObj = {
    sideMenu: getStyles([
      {
        width,
      },
      style
    ])
  }

  useImperativeHandle<unknown, SideMenuHandleType>(
    ref,
    () => ({
      setActiveMenu,
      setActiveMenuSub
    }),
    []
  )

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
      <aside style={stylesObj.sideMenu} className={classNamesObj.sideMenu}>
        {getMenus(menuTree)}
        {children && children}
      </aside>
    </SideMenuComtext.Provider>

  )
}
export default forwardRef(SideMenu) 