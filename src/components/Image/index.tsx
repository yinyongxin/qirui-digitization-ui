import React, { FC, MouseEventHandler, ReactNode, useContext, useState } from "react"
import { Icon, Mask } from "../index"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, isBoolean, isNumber } from "../utils/tools"
import omit from "../utils/tools/omit"
import { ImagePropsType } from "./interface"

const Image: FC<ImagePropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-image`

  const [visible, setVisible] = useState(false)
  const [loadingState, setLoadingState] = useState<'loading' | 'error' | 'success'>('loading')

  const {
    imgAttributes = {},
    style = {},
    width = "100%",
    height = '100%',
    src,
    closeRender,
    closeShow = 'never',
    error,
    loader = true,
    mask = false,
    optionsShow = 'never',
    optionsRender,
    onClose,
    ...rest
  } = props

  const classNamesObj = {
    imageComponent: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      ...classNames
    ]),
    img: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-img`,
      imgAttributes.className || '',
      ...classNames
    ]),
    options: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-options`,
      ...classNames
    ]),
    close: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-close`,
      ...classNames
    ]),
    mask: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-mask`,
      ...classNames
    ]),
    error: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-error`,
      ...classNames
    ]),
    loading: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-loading`,
      ...classNames
    ]),
  }

  const CloseRenderConponent = () => {
    if (closeShow === 'never') {
      return <></>
    }
    const closeRenderContent = closeRender ? (
      <>
        {closeRender()}
      </>
    ) : (
      <Icon style={{ color: 'var(--design-neutral-color-6)' }} icon={"circle-xmark"} size={22} />
    )
    const closeClick: MouseEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation()
      onClose && onClose()
    }

    if (closeShow === 'hover') {
      return (
        <>
          {visible && (
            <div
              onClick={closeClick}
              className={classNamesObj.close()}
            >
              {closeRenderContent}
            </div>
          )}
        </>
      )
    }
    else {
      return (
        <div
          onClick={closeClick}
          className={classNamesObj.close()}
        >
          {closeRenderContent}
        </div>
      )
    }
  }

  const OptionsRender = () => {
    if (optionsShow === 'never') {
      return <></>
    }
    const optionsRenderContent = optionsRender ? (
      <div onClick={(e) => e.stopPropagation()} className="absolute-fill">
        {optionsRender()}
      </div>
    ) : (
      <div onClick={(e) => e.stopPropagation()} className={classNamesObj.options()}>
        options
      </div>
    )
    if (optionsShow === 'hover') {
      return (
        <>
          {visible && optionsRenderContent}
        </>
      )
    }
    else {
      return optionsRenderContent
    }
  }

  const LoadStateContent = () => {
    const iconSize = isNumber(width) ? width / 3 : 30

    if (loadingState === 'error') {
      return (
        <div className={classNamesObj.error()}>
          {error || <Icon icon="circle-exclamation" size={iconSize} />}
        </div>
      )
    } else if (loadingState === 'loading' && loader) {
      return (
        <div className={classNamesObj.loading()}>
          {!isBoolean(loader) ? loader : <Icon icon="image" size={iconSize} />}
        </div>
      )
    } else {
      return (<></>)
    }
  }

  const imgAtts: JSX.IntrinsicElements['img'] = {
    onError: (e) => {
      setLoadingState('error')
      imgAttributes?.onError?.(e)
    },
    onLoad: (e) => {
      setLoadingState('success')
      imgAttributes?.onError?.(e)
    },
    loading: 'lazy',
    style: {
      display: loadingState === 'error' ? 'none' : 'unset',
      width,
      height,
      ...imgAttributes?.style,
    },
    src: src,
    className: classNamesObj.img(),
    ...omit(imgAttributes, ['style', 'className', 'onError', 'onLoad', 'src'])
  }

  return (
    <div
      className={classNamesObj.imageComponent()}
      onMouseEnter={() => {
        setVisible(true)
      }}
      onMouseLeave={() => {
        setVisible(false)
      }}
      style={{
        width,
        height,
        ...style
      }}
    >
      <img {...imgAtts} />
      <LoadStateContent />
      {/* <Mask /> */}
      {loadingState === 'success' && (
        <>
          <OptionsRender />
          <Mask visible={mask && visible} />
        </>
      )}
      <CloseRenderConponent />
    </div>
  )
}
export default Image