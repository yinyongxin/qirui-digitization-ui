import React, { ForwardRefRenderFunction, ReactNode, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import Button from "../Button"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { getClassNames } from "../utils/tools"
import { ModalHandle, ModalPropsType } from "./interface"
import { Root, createRoot } from "react-dom/client"
import { useMemo } from "react"

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

    if (visible && refFlag.current.isFristCreate) {
      const messagesContent = document.createElement('div');
      document.body.appendChild(messagesContent);
      refFlag.current.root = createRoot(messagesContent!);
    }
    if (!visible && !refFlag.current.isFristCreate) {
      if (unmountOnExit) {
        refFlag.current.root?.render(content);
      } else {
        refFlag.current.root?.render(<></>);
      }
      return
    }
    if (!visible && refFlag.current.isFristCreate) {
      refFlag.current.root?.render(content);
    }
    if (visible) {
      refFlag.current.root?.render(content);
      refFlag.current.isFristCreate = false
    }
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

  const HeaderRender = () => {
    let headerRes = null
    if (!header) {
      return <></>
    } else if (header === 'default') {
      headerRes = title
    } else {
      headerRes = header
    }
    return (
      <header className={`${prefixCls}-header ${headerCenter ? 'justify-center' : 'justify-start'}`}>
        {headerRes}
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

  const FooterRender = () => {
    let footerRes = null
    if (!footer) {
      return <></>
    } else if (footer === 'default') {
      footerRes = (
        <>
          <Button
            onClick={onCancelHandle}
            level="secondary"
            size='large'
            {...cancelButtonProps}
          >{cancelText}</Button>
          <Button
            onClick={onConfirmModal}
            size='large'
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

  const IconRender = () => {
    let iconRes = null
    if (!icon) {
      return <></>
    } else if (icon === 'default') {
      iconRes = (
        <Icon icon={"xmark"} size={24} />
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

  const Container = () => {
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
          <IconRender />
          <HeaderRender />
          <Container />
          <FooterRender />
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
    if (refFlag.current.isFristCreate && mountOnEnter) {
      modalRender(content(true))
    } else {
      refresh()
    }
  }, [visible])

  return (
    isComponent ? content(true) : (<></>)
  )
}
export default React.forwardRef(Modal)