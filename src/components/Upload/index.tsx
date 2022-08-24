import React, { FC, useContext, useRef, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, isFunction, isString } from "../utils/tools"
import { UploadPropsType } from "./interface"
import {
  Button,
  Image
} from '../index'

const Upload: FC<UploadPropsType> = (props) => {


  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const {
    onChange,
    inputFileAttributes,
    children,
    showFileList,
    disabled = false,
    files,
    defaultFileList,
    ...rest
  } = props

  const inputRef = useRef<HTMLInputElement>()

  const [value, setValue] = useState<FileList>()

  const prefixCls = `${classNamePrefix}-upload`



  const classNamesObj = {
    upload: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      ...classNames
    ]),
    input: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-input`,
      ...classNames
    ])
  }

  const inputAttributes: JSX.IntrinsicElements['input'] = {
    className: classNamesObj.input(),
    title: "file",
    multiple: false,
    onChange: (e) => {
      if (e.target.files && e.target.files?.length !== 0) {
        onChange && onChange(e.target.files, e)
        setValue(e.target.files)
      }
    },
    ...inputFileAttributes,
    type: "file",
  }

  const buttonHandleClick = () => {
    inputRef.current?.click()
  }

  const fileListRender = () => {
    return (
      <>
        {value && [...value].map((item, index) => (
          <div key={index}>
            <Image
              imgAttributes={{
                style: {
                  width: 200,
                  height: 200,
                  objectFit: "contain"
                },
                alt: "img"
              }}
              src={URL.createObjectURL(item)}
            />
            {index + 1} {item.name}
          </div>
        ))}
      </>
    )
  }

  const btnRender = () => {
    if (children && isString(children)) {
      return (
        <Button
          size='large'
          level="white"
          disabled={disabled}
          onClick={buttonHandleClick}
        >
          {children && isFunction(children) ? children(value) : children}
        </Button>
      )
    } else {
      return (
        <div
          onClick={buttonHandleClick}
        >
          {children && isFunction(children) ? children(value) : children}
        </div>
      )
    }
  }

  return (
    <div className={classNamesObj.upload()}>
      <input ref={inputRef as any} {...inputAttributes} />
      {btnRender()}
      {showFileList && fileListRender()}
    </div>
  )
}
export default Upload