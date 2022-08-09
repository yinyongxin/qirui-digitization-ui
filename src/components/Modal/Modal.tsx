import React, { ForwardRefRenderFunction, ReactNode, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import Button from "../Button"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { getClassNames } from "../utils/tools"
import { ModalHandle, ModalPropsType } from "./interface"
import { Root, createRoot } from "react-dom/client"

const Modal: ForwardRefRenderFunction<unknown, ModalPropsType> = (props, ref) => {

  const {
    classNamePrefix,
    ModalConfig
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-modal`

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
    getChildrenPopupContainer,
    getPopupContainer,
  } = {
    ...ModalConfig,
    ...props,
  }

  const refFlag = useRef<{
    isFristCreate: boolean,
    root: Root | null
  }>({
    isFristCreate: true,
    root: null
  })

  const modalRender = (content: ReactNode) => {
    if (isComponent) {
      return
    }
    if (refFlag.current.isFristCreate) {
      const messagesContent = document.createElement('div');
      document.body.appendChild(messagesContent);
      refFlag.current.root = createRoot(messagesContent!);
    }

    refFlag.current.root?.render(content);
  }

  const [visible, setVisible] = useState<boolean>(propsVisible)
  const [loading, setLoading] = useState<boolean>(false)

  const modalClassName = getClassNames([
    `${prefixCls}`,
    `${prefixCls}-border`
  ])

  const modalMainClassName = getClassNames([
    `${prefixCls}-main`,
    border ? `${prefixCls}-main-border` : ''
  ])

  const modalBodyClassName = getClassNames([
    `${prefixCls}-body`,
    border ? `${prefixCls}-body-border` : ''
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

  const onConfirmModal: React.MouseEventHandler<HTMLElement> = (e: any) => {
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
            level="secondary"
            {...cancelButtonProps}
          >{cancelText}</Button>
          <Button
            onClick={onConfirmModal}
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
    <div style={{ display: visible ? 'unset' : 'none' }} className={modalClassName}>
      {mask && (
        <div className={`${prefixCls}-mask`}></div>
      )}
      <main style={mainStyle} className={modalMainClassName}>
        <div
          style={bodyStyle}
          className={modalBodyClassName}
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
    modalRender(content(true))
    refFlag.current.isFristCreate = false
    afterOpen && afterOpen()
  }

  const close = () => {
    setVisible(false)

    if (unmountOnExit) {
      refFlag.current.root?.render(<></>);
    } else {
      modalRender(content(false))
    }
    afterClose && afterClose()
  }

  const refresh = (visible = true) => {
    modalRender(content(visible))
  }

  useImperativeHandle<unknown, ModalHandle>(
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
    // 如果时第一次创建且要在显示之前就渲染执行
    if (refFlag.current.isFristCreate && mountOnEnter) {
      modalRender(content(visible))
      refFlag.current.isFristCreate = false
    }
  }, [])

  return (
    isComponent ? content(true) : (<></>)
  )
}
export default React.forwardRef(Modal)