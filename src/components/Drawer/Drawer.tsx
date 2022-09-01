import React, { ForwardRefRenderFunction, ReactNode, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import Button from "../Button"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { ClassNameType, getClassNames, getStyles } from "../utils/tools"
import { DrawerHandle, DrawerPropsType } from "./interface"
import { Root, createRoot } from "react-dom/client"
import { useDocumentRender } from "../utils/hooks"
import Portal from "../Portal"
import Mask from "../Mask"

const Drawer: ForwardRefRenderFunction<unknown, DrawerPropsType> = (props, ref) => {

  const {
    classNamePrefix,
    DrawerConfig
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-drawer`

  const {
    header,
    footer,
    title,
    children,
    mask,
    visible: propsVisible = false,
    icon,
    mianStyle,
    width,
    alignCenter,
    cancelButtonProps,
    okButtonProps,
    cancelText,
    okText,
    onCancel,
    onOK,
    afterClose,
    afterOpen,
    unmountOnExit,
    mountOnEnter,
    isComponent,
    headerCenter,
    footerAlign = 'left',
    footerBorder,
    border,
    placement,
    getChildrenPopupContainer,
    getPopupContainer,
    style,
    className,
    ...rest
  } = {
    ...DrawerConfig,
    ...props,
  }

  const refFlag = useRef<{
    isFristVisible: boolean,
    root: Root | null
  }>({
    isFristVisible: true,
    root: null
  })

  const [visible, setVisible] = useState<boolean>(propsVisible)
  const [loading, setLoading] = useState<boolean>(false)



  const classNamesObj = {
    drawer: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      `${prefixCls}-border`,
      ...classNames,
      className
    ]),
    drawerMain: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-main`,
      `${prefixCls}-main-${placement}`,
      {
        [`${prefixCls}-main-border`]: border,
        [`${prefixCls}-main-animation`]: true,
      },
      ...classNames
    ]),
    drawerBody: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-body`,
      `${prefixCls}-body-keyframes-${placement}`,
      {
        [`${prefixCls}-body-border`]: border
      },
      ...classNames
    ]),
    drawerHeader: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-header`,
      {
        'justify-center': headerCenter,
        'justify-start': !headerCenter,
      },
      ...classNames
    ]),
    drawerFooter: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-footer`,
      `justify-${footerAlign}`,
      {
        [`${prefixCls}-footer-border`]: footerBorder
      },
      ...classNames
    ]),
  }

  const stylesObj = {
    comp: getStyles([
      style,
      {
        display: visible ? 'unset' : 'none'
      }
    ])
  }

  const onConfirmDrawer: React.MouseEventHandler<HTMLElement> = (e: any) => {
    let ret;
    if (onOK) {
      ret = onOK(e);
    }
    if (ret && ret.then) {
      setLoading(true);
      ret.then(
        () => {
          setLoading(false);
        },
        (e: Error) => {
          setLoading(false);
          console.error(e);
        }
      );
    }
  };

  const onCancelHandle = () => {
    onCancel && onCancel()
    close()
  }

  const mainStyle: React.CSSProperties = alignCenter ? {
    alignItems: 'center'
  } : {
  }

  const bodyStyle: React.CSSProperties = {
    width,
    ...(
      alignCenter ? {} : {
        paddingTop: 200,
      }
    )
  }

  const mainContent = {
    iconRender: () => {
      let iconRes = null
      if (!icon) {
        return
      } else if (icon === 'default') {
        iconRes = (
          <Icon icon={"xmark"} />
        )
      } else {
        iconRes = icon
      }
      return (
        <div onClick={onCancelHandle} className={`${prefixCls}-icon`}>
          {iconRes}
        </div>
      )
    },
    headerRender: () => {
      let footerRes = null
      if (!header) {
        return
      } else if (header === 'default') {
        footerRes = title
      } else {
        footerRes = header
      }
      return (
        <header className={classNamesObj.drawerFooter()}>
          {footerRes}
        </header>
      )
    },
    containerRender: () => {
      return (
        <main className={`${prefixCls}-container`} style={mianStyle}>
          {children && children}
        </main>
      )
    },
    footerRender: () => {
      let footerRes = null
      if (!footer) {
        return
      } else if (footer === 'default') {
        footerRes = (
          <>
            <Button
              onClick={onCancelHandle}
              size='large'
              status="primary"
              {...cancelButtonProps}
            >{cancelText}</Button>
            <Button
              size='large'
              onClick={onConfirmDrawer}
              {...okButtonProps}
            >{okText}</Button>
          </>
        )
      } else {
        footerRes = footer
      }
      return (
        <footer className={classNamesObj.drawerFooter()}>
          {footerRes}
        </footer>
      )
    },
  }

  const content = (
    <div {...rest} style={stylesObj.comp} className={classNamesObj.drawer()}>
      <Mask clickThrough zIndex="unset" visible={mask} />
      <main style={mainStyle} className={classNamesObj.drawerMain()}>
        <div
          style={bodyStyle}
          className={classNamesObj.drawerBody()}
        >
          {mainContent.iconRender()}
          {mainContent.headerRender()}
          {mainContent.containerRender()}
          {mainContent.footerRender()}
        </div >
      </main>
    </div >
  )

  const open = () => {
    setVisible(true)
    afterOpen && afterOpen()
  }

  const close = () => {
    setVisible(false)
    afterClose && afterClose()
  }


  useImperativeHandle<unknown, DrawerHandle>(
    ref,
    () => ({
      open,
      close,
      visible,
    }),
    [visible]
  )

  return (
    isComponent ? content : (
      <Portal forceRender={mountOnEnter || (!refFlag.current.isFristVisible && unmountOnExit)} visible={visible} container={getPopupContainer?.()}>
        {content}
      </Portal>
    )
  )
}
export default React.forwardRef(Drawer)