import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames } from "../utils/tools"
import { UploadPropsType } from "./interface"
import {
  Image
} from '../index'

const Upload: FC<UploadPropsType> = (props, ref) => {


  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const [value, setValue] = useState<FileList>()

  const prefixCls = `${classNamePrefix}-upload`

  const {
    ...rest
  } = props

  const classNamesObj = {
    icon: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      ...classNames
    ])
  }

  return (
    <div className={classNamesObj.icon()}>
      <input title="file" multiple type="file" onChange={(e) => {
        console.log('e', e, e.target, e.target.files);
        if (e.target.files && e.target.files?.length !== 0) {
          setValue(e.target.files)
        }
      }} />
      {value && [...value].map((item, index) => (
        <div>
          <Image
            imgProps={{
              style: {
                width: 200,
                height: 200,
                objectFit: "contain"
              },
              src: URL.createObjectURL(item),
              alt: "img"
            }}
          />
          {index + 1} {item.name}
        </div>
      ))}
    </div>
  )
}
export default Upload