import { Key, PropsWithChildren, ReactNode } from "react"
import { DesignTypes } from "../typings"

export type ActiveKeyType = Key

export type MenuTreeItemType<T = SidePropsType> = Omit<T, 'key' | 'index' | 'borders'> & {
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
  width?: number,

  borders?: DesignTypes['Direction'][]
}

export type SidePropsType = {
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
  key?: ActiveKeyType,
  /**
   * 用于onMenuItemClick onMenuSubClick 事件统一处理参数
   */
  values?: Record<string, any>,

  /**
   * 当前属于第一个层级
   */
  index: number,

  render?: (item: SidePropsType, active: boolean, config: Pick<SidePropsType, 'index'>) => ReactNode
}

export type SideMenuHandleType = {
  setActiveMenu: React.Dispatch<React.SetStateAction<React.Key[]>>;
  setActiveMenuSub: React.Dispatch<React.SetStateAction<React.Key[]>>
}

export type SideMenuItemPropsType = SidePropsType & Omit<JSX.IntrinsicElements['div'], 'key' | 'title' | 'children'>

export type SideMenuItemSubPropsType = PropsWithChildren<SidePropsType>

export type SideMenuComtextType = {
  /**
   * 选中的menuIiem
   */
  activeMenu: ActiveKeyType[],
  /**
   * 选中的menuSub
   */
  activeMenuSub: ActiveKeyType[],
  setActiveMenu?: React.Dispatch<React.SetStateAction<React.Key[]>>
  setActiveMenuSub?: React.Dispatch<React.SetStateAction<React.Key[]>>
} & Omit<SideMenuBaseType, 'menuTree' | 'activeChange' | 'borders'>

export type SideMenuPropsType = PropsWithChildren<SideMenuBaseType> 