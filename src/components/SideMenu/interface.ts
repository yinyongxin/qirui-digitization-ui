import { Key, PropsWithChildren, ReactNode } from "react"

export type ActiveKeyType = Key

export type MenuTreeItemType<T = SidePropsType> = Omit<T, 'key'> & {
  children?: MenuTreeItemType[],
}

export interface SideMenuBaseType {
  menuTree: MenuTreeItemType[],
  // 默认选中
  defaultActiveKeys?: ActiveKeyType[],
  /**
   * 默认开启
   */
  defaultOpenKeys?: ActiveKeyType[],
  /**
   * MenuItem改变时触发
   */
  activeMenuItemChange?: (menuItems: ActiveKeyType[], menuItemProp: SidePropsType) => void,
  /**
   * MenuSub改变时触发
   */
  activeMenuSubChange?: (menuSubs: ActiveKeyType[], menuSubProp: SidePropsType) => void,
  /**
   * MenuItem点击时触发
   */
  onMenuItemClick?: (item: SidePropsType) => void,
  /**
   * MenuSub点击时触发
   */
  onMenuSubClick?: (item: SidePropsType) => void,
   /**
  * 是否默认全部展开
  */
  allOpen?: boolean,
}

export type SidePropsType ={
  /**
   * 图标
   */
  icon?: string,
  /**
   * 标题
   */
  title: ReactNode,
  /**
   * 选中时唯一标识
   */
  activeKey: ActiveKeyType,
  /**
   * list key
   */
  key: ActiveKeyType,
  /**
   * 用于onMenuItemClick onMenuSubClick 事件统一处理参数
   */
  values?: Record<string, any>,

  render?: (item: SidePropsType, active: boolean) => ReactNode
}

export type SideMenuItemPropsType = SidePropsType

export type SideMenuItemSubPropsType =PropsWithChildren<SidePropsType> 

export type SideMenuComtextType = {
  /**
   * 选中的menuIiem
   */
  activeMenu: ActiveKeyType[],
  /**
   * 选中的menuSub
   */
  activeMenuSub: ActiveKeyType[],
  setActiveMenu?:React.Dispatch<React.SetStateAction<React.Key[]>> 
  setActiveMenuSub?:React.Dispatch<React.SetStateAction<React.Key[]>> 
} & Omit<SideMenuBaseType, 'menuTree' | 'activeChange'>  

export type SideMenuPropsType = SideMenuBaseType