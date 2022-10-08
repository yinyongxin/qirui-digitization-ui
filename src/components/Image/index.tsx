import React, { FC, MouseEventHandler, ReactNode, useContext, useState } from "react"
import { Icon, Mask } from "../index"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, isBoolean, isNumber, omit } from "../utils/tools"
import { ImagePropsType } from "./interface"
import { useDocumentRender } from "../utils/hooks"
import ImagePreview from './ImagePreview'
import { useEffect } from "react"

const Image: FC<ImagePropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const {
    render,
    destroy
  } = useDocumentRender()

  const prefixCls = `${classNamePrefix}-image`

  const [visible, setVisible] = useState(false)
  const [loadingState, setLoadingState] = useState<'loading' | 'error' | 'success'>('loading')

  const {
    imgAttributes = {},
    style = {},
    width = "100%",
    height = '100%',
    src: srcProps,
    objectFit = 'cover',
    closeRender,
    closeShow = 'never',
    error,
    loader = true,
    icon = 'plus',
    defaultSrc,
    mask = false,
    optionsShow = 'never',
    preview,
    optionsRender: optionsRenderProps,
    onClose,
    ...rest
  } = props

  const [src, setSrc] = useState(srcProps)

  const classNamesObj = {
    imageComponent: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      {
        'cursor-pointer': preview
      },
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

  const previewFn = () => {
    render(<ImagePreview close={destroy} imgAttributes={{ src }} />)
  }

  const optionsRender = () => {
    if (optionsShow === 'never') {
      return <></>
    }
    const optionsRenderContent = optionsRenderProps ? (
      <div onClick={(e) => e.stopPropagation()} className="absolute-fill">
        {optionsRenderProps(previewFn)}
      </div>
    ) : (
      <div onClick={(e) => e.stopPropagation()} className={classNamesObj.options()}>
        <Icon onClick={() => previewFn()} className="cursor-pointer" type="solid" icon="eye" size={20} />
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

  /**
   * 加载状态显示内容
   * @returns ReactNode
   */
  const loadStateRender = () => {
    const iconSize = isNumber(width) ? width / 3 : 30

    if (loadingState === 'error') {
      return (
        <div className={classNamesObj.error()}>
          {
            error
            ||
            <Icon icon={icon} size={isNumber(width) ? width / 3.5 : 20} />
          }
        </div>
      )
    } else if (loadingState === 'loading' && loader) {
      return (
        <div className={classNamesObj.loading()}>
          {isBoolean(loader) ?
            <Icon icon="image" size={iconSize} />
            :
            loader
          }
        </div>
      )
    }
  }

  const imgAtts: JSX.IntrinsicElements['img'] = {
    onError: (e) => {
      setTimeout(() => {
        defaultSrc && setSrc(defaultSrc)
      })
      setLoadingState('error')
      imgAttributes?.onError?.(e)
    },
    onLoad: (e) => {
      setLoadingState('success')
      imgAttributes?.onLoad?.(e)
    },
    loading: 'lazy',
    style: {
      width,
      height,
      objectFit,
      ...imgAttributes?.style,
    },
    src: src,
    className: classNamesObj.img(),
    ...omit(imgAttributes, ['style', 'className', 'onError', 'onLoad', 'src'])
  }

  useEffect(() => {
    setSrc(srcProps)
  }, [srcProps])

  return (
    <div
      className={classNamesObj.imageComponent()}
      onMouseEnter={() => {
        setVisible(true)
      }}
      onMouseLeave={() => {
        setVisible(false)
      }}
      onClick={() => {
        preview && previewFn()
      }}
      style={{
        width,
        height,
        ...style
      }}
    >
      <img {...imgAtts} />
      {loadStateRender()}
      {loadingState === 'success' && (
        <>
          {optionsRender()}
          <Mask visible={mask && visible} />
        </>
      )}
      <CloseRenderConponent />
    </div>
  )
}
export default Image