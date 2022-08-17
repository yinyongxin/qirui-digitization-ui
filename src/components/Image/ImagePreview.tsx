import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import Mask from "../Mask"
import { ClassNameType, getClassNames } from "../utils/tools"
import { ImagePreviewPropsType } from "./interface"

const ImagePreview: FC<ImagePreviewPropsType> = (props, ref) => {


  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-imagePreview`

  const {
    imgAttributes,
    close,
  } = props

  const classNamesObj = {
    imagePreview: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      ...classNames
    ]),
    main: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-main`,
      ...classNames
    ]),
    icon: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-icon`,
      ...classNames
    ]),
    img: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-img`,
      ...classNames
    ])
  }

  return (
    <div className={classNamesObj.imagePreview()}>
      <Mask zIndex='unset' />
      <div className={classNamesObj.main()}>
        <div className="relative">
          <Icon
            onClick={() => close()}
            className={classNamesObj.icon()}
            icon="xmark"
            style={{ color: 'var(--design-neutral-color-1)' }}
            size={26}
          />
          <img
            style={{
              width: '60vw',
              height: '60vh',
            }}
            className={classNamesObj.img()}
            {...imgAttributes}
          ></img>
        </div>
      </div>
    </div>
  )
}
export default ImagePreview