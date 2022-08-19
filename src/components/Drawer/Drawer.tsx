import React, { ForwardRefRenderFunction, ReactNode, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import Button from "../Button"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { getClassNames } from "../utils/tools"
import { DrawerHandle, DrawerPropsType } from "./interface"
import { Root, createRoot } from "react-dom/client"
import { useDocumentRender } from "../utils/hooks"

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
    footerCenter,
    footerBorder,
    border,
    placement,
    getChildrenPopupContainer,
    getPopupContainer,
  } = {
    ...DrawerConfig,
    ...props,
  }

  const refFlag = useRef<{
    isFristCreate: boolean,
    root: Root | null
  }>({
    isFristCreate: true,
    root: null
  })

  const {
    render,
    destroy
  } = useDocumentRender()

  const drawerRender = (content: ReactNode) => {
    if (isComponent) {
      return
    }

    if (mountOnEnter && !visible && refFlag.current.isFristCreate) {
      render(content)
      return
    }

    // 如果是进入前渲染且是第一次
    if (mountOnEnter && refFlag.current.isFristCreate) {
      render(content)
      refFlag.current.isFristCreate = false
      return
    }

    if (visible) {
      render(content)
      refFlag.current.isFristCreate = false
      return
    }

    if (!visible && !refFlag.current.isFristCreate) {
      if (unmountOnExit) {
        render(content)
      } else {
        destroy()
      }
    }
  }

  const [visible, setVisible] = useState<boolean>(propsVisible)
  const [loading, setLoading] = useState<boolean>(false)

  const drawerClassName = getClassNames([
    `${prefixCls}`,
    `${prefixCls}-border`
  ])

  const drawerMainClassName = getClassNames([
    `${prefixCls}-main`,
    border ? `${prefixCls}-main-border` : '',
    `${prefixCls}-main-${placement}`
  ])

  const drawerBodyClassName = getClassNames([
    `${prefixCls}-body`,
    border ? `${prefixCls}-body-border` : '',
    `${prefixCls}-body-keyframes-${placement}`
  ])

  const headerRender = () => {
    let footerRes = null
    if (!header) {
      return
    } else if (header === 'default') {
      footerRes = title
    } else {
      footerRes = header
    }
    return (
      <header className={`${prefixCls}-header ${headerCenter ? 'justify-center' : 'justify-start'}`}>
        {footerRes}
      </header>
    )
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

  const footerRender = () => {
    let footerRes = null
    if (!footer) {
      return
    } else if (footer === 'default') {
      footerRes = (
        <>
          <Button
            onClick={onCancelHandle}
            size='large'
            level="secondary"
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
      <footer className={`${prefixCls}-footer ${footerCenter ? 'justify-center' : 'justify-end'} ${footerBorder ? prefixCls + '-footer-border' : ''}`}>
        {footerRes}
      </footer>
    )
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

  const iconRender = () => {
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
  }

  const getContainer = () => {
    return (
      <main className={`${prefixCls}-container`} style={mianStyle}>
        {children && children}
      </main>
    )
  }

  const content = (visible: boolean) => (
    <div style={{ display: visible ? 'unset' : 'none' }} className={drawerClassName}>
      {mask && (
        <div className={`${prefixCls}-mask`}></div>
      )}
      <main style={mainStyle} className={drawerMainClassName}>
        <div
          style={bodyStyle}
          className={drawerBodyClassName}
        >
          {iconRender()}
          {headerRender()}
          {getContainer()}
          {footerRender()}
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

  const refresh = () => {
    drawerRender(content(visible))
  }

  useImperativeHandle<unknown, DrawerHandle>(
    ref,
    () => ({
      open,
      close,
      visible,
      refresh
    }),
    [visible]
  )

  useEffect(() => {
    refresh()
  }, [visible, props])

  return (
    isComponent ? content(true) : (<></>)
  )
}
export default React.forwardRef(Drawer)