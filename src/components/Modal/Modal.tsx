import React, { ForwardRefRenderFunction, ReactNode, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import Button from "../Button"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { ClassNameType, getClassNames } from "../utils/tools"
import { ModalHandle, ModalPropsType } from "./interface"
import { Root, createRoot } from "react-dom/client"
import Mask from "../Mask"
import { useDocumentRender } from "../utils/hooks"

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

  const {
    render,
    destroy
  } = useDocumentRender()

  const modalRender = (content: ReactNode) => {
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

  const classNamesObj = {
    modal: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      `${prefixCls}-border`,
      ...classNames
    ]),
    modalMain: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-main`,
      {
        [`${prefixCls}-main-border`]: border
      },
      ...classNames
    ]),
    modalBody: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-body`,
      {
        [`${prefixCls}-body-border`]: border
      },
      ...classNames
    ]),
    modalHeader: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-header`,
      {
        'justify-center': headerCenter,
        'justify-start': !headerCenter,
      },
      ...classNames
    ]),
    // {`${prefixCls}-footer ${footerCenter ? 'justify-center' : 'justify-end'} ${footerBorder ? prefixCls + '-footer-border' : ''}`}
    modalFooter: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-footer`,
      {
        'justify-center': footerCenter,
        'justify-end': !footerCenter,
        [`${prefixCls}-footer-border`]: footerBorder
      },
      ...classNames
    ]),
  }

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
      <header className={classNamesObj.modalHeader()}>
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
      <footer className={classNamesObj.modalFooter()}>
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
    <div style={{ display: visible ? 'unset' : 'none' }} className={classNamesObj.modal()}>
      <Mask clickThrough zIndex="unset" visible={mask} />
      <main style={mainStyle} className={classNamesObj.modalMain()}>
        <div
          style={bodyStyle}
          className={classNamesObj.modalBody()}
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
    refresh()
  }, [visible])

  return (
    isComponent ? content(true) : (<></>)
  )
}
export default React.forwardRef(Modal)