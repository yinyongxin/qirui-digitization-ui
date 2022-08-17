import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import Input from "../Input"
import { ClassNameType, getClassNames } from "../utils/tools"
import { FormPropsType } from "./interface"

const Form: FC<FormPropsType> = (props) => {


  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const formRef = useRef<HTMLFormElement>(null)

  const prefixCls = `${classNamePrefix}-Form`

  const {
    className = '',
    children,
    ...rest
  } = props

  const submit = () => {
    console.log('formRef', formRef);
    console.log('name', formRef.current['name'].value);
    console.log('select', formRef.current['select'].value);
  }

  const classNamesObj = {
    form: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      className,
      ...classNames
    ])
  }

  // useEffect(() => {
  //   console.log('formRef', formRef);

  // }, [])

  return (
    <form ref={formRef} className={classNamesObj.form()}>
      {children && children}
      <input
        type="submit"
        value="Submit"
        onClick={(e) => {
          e.preventDefault()
          submit()
        }}
      ></input>
    </form>
  )
}
export default Form