import React, { FC, MouseEventHandler, ReactNode, useContext, useState } from "react"
import { Icon } from "../index"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames } from "../utils/tools"
import omit from "../utils/tools/omit"
import { ImagePropsType } from "./interface"

const Image: FC<ImagePropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-image`

  const [visible, setVisible] = useState(false)

  const {
    imgAttributes = {},
    closeRender,
    closeShow = 'never',
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
    ])
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

  return (
    <div
      className={classNamesObj.imageComponent()}
      onMouseEnter={() => {
        setVisible(true)
      }}
      onMouseLeave={() => {
        setVisible(false)
      }}
    >
      <img
        style={{ ...imgAttributes?.style }}
        className={classNamesObj.img()}
        {...omit(imgAttributes, ['style',])}
      />
      <OptionsRender />
      <CloseRenderConponent />
      {mask && visible && (
        <div onClick={(e) => e.stopPropagation()} className={classNamesObj.mask()}></div>
      )}
    </div>
  )
}
export default Image