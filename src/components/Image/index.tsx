import React, { FC, ReactNode, useContext, useState } from "react"
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

  const [optionsVisible, setOptionsVisible] = useState(false)

  const {
    imgAttributes = {},
    closeRender,
    closeShow = false,
    onClose,
    mask = true,
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
    let resContent: ReactNode = (
      <Icon style={{ color: 'var(--design-neutral-color-6)' }} icon={"circle-xmark"} size={22} />
    )
    if (closeRender) {
      resContent = closeRender
    }
    return (
      <>
        {(closeShow || optionsVisible) && (
          <div
            onClick={() => onClose && onClose()}
            className={classNamesObj.close()}
          >
            {resContent}
          </div>
        )}
      </>
    )
  }

  const OptionsRender = () => {
    return (
      <>
        {optionsVisible && (
          <div className={classNamesObj.options()}>
            
          </div>
        )}
      </>
    )
  }

  return (
    <div
      className={classNamesObj.imageComponent()}
      onMouseEnter={() => {
        setOptionsVisible(true)
      }}
      onMouseLeave={() => {
        setOptionsVisible(false)
      }}
    >
      <img
        style={{ ...imgAttributes?.style }}
        className={classNamesObj.img()}
        {...omit(imgAttributes, ['style',])}
      />
      <OptionsRender />
      <CloseRenderConponent />
      {mask && optionsVisible && (
        <div className={classNamesObj.mask()}></div>
      )}
    </div>
  )
}
export default Image