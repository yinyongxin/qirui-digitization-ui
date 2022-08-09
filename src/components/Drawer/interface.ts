import React, { CSSProperties, ForwardRefExoticComponent, PropsWithChildren, ReactNode } from "react"
import { ButtonPropsType } from "../Button/interface"

export interface DrawerBaseType {
  header?: ReactNode | 'default',
  footer?: ReactNode | 'default' ,
  visible?: boolean,
  icon?: ReactNode | 'default',
  /**
   * 弹出框的标题
   */
  title?: ReactNode,
  /**
   * 	弹出框垂直水平居中
   */
  alignCenter?: boolean,
  /**
   * 是否显示遮罩
   */
  mask?: boolean,
  // 是否在隐藏之后销毁DOM结构
  unmountOnExit?: boolean,
  /**
   * 	主样式
   */
  mianStyle?: CSSProperties,
  /**
   * 取消按钮的 props
   */
  cancelButtonProps?: ButtonPropsType,
  /**
   * 	确认按钮的 props
   */
  okButtonProps?: ButtonPropsType,
  /**
   * 	取消按钮文案
   */
  cancelText?: ReactNode,
  /**
   * 	确认按钮的 props
   */
  okText?: ReactNode,
  /**
   * 关闭弹出框的回调
   */
  onCancel?: () => void,
  /**
   * 点击确认按钮的回调
   */
  onOK?: (e?: MouseEvent | React.MouseEvent) => Promise<any> | void,
  /**
   * 	弹框关闭之后的回调
   */
  afterClose?: () => void,
  /**
   * 	弹框打开之后的回调
   */
  afterOpen?: () => void,
  /**
   * 对话框里的弹出框 Select Tooltip 等挂载的容器，默认挂载在对话框内。
   */
  getChildrenPopupContainer?: (node: HTMLElement) => Element
  /**
   * 指定弹出框挂载的父节点
   */
  getPopupContainer?: () => Element,
  /**
   * 	是否在初次打开对话框时才渲染 dom
   */
  mountOnEnter?: boolean,
  width?: number,
  /**
   * 是否作为组件
   */
  isComponent?: boolean,
  /**
   * 头部是否居中
   */
  headerCenter?: boolean,
  /**
   * 底部是否居中
   */
  footerCenter?: boolean,
  /**
   * 底部边框是否显示
   */
  footerBorder?: boolean,
  border?: boolean,
  /**
   * Drawer 位置
   */
  placement?: 'left' | 'right'
}

export type DrawerHandle = {
  open: () => void,
  close: () => void,
  visible: boolean,
  refresh: (visible: boolean) => void
}

export type DrawerPropsType = PropsWithChildren<DrawerBaseType>


export type DrawerItemProp = Omit<DrawerPropsType, 'visible' | 'mountOnEnter' | 'unmountOnExit' >
export interface DrawerComponentInterFace extends ForwardRefExoticComponent<DrawerPropsType & {
  ref?: React.MutableRefObject<DrawerHandle | undefined>
}> {
  show: (config: DrawerItemProp ) => {
    close: () => void,
    update: (config: DrawerItemProp) => void
  },
}