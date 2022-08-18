import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { Button } from "../index"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles, pick } from "../utils/tools"
import { FormContext, FormContextDefult } from "./FormContext"
import FormItem from "./FormItem"
import { FormPropsInterface } from "./interface"

const Form: FC<FormPropsInterface> = (props) => {


  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const formRef = useRef<HTMLFormElement>(null)

  const prefixCls = `${classNamePrefix}-form`

  const allField = {
    ...FormContextDefult,
    ...props
  }

  const {
    className,
    children,
    width,
    style,
    ...rest
  } = allField

  const {
    layout,
    columns
  } = allField


  const submit = () => {
    console.log('formRef', formRef);
  }

  const classNamesObj = {
    form: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      {
        [`${prefixCls}-grid`]: layout !== 'inline',
        [`${prefixCls}-flex`]: layout === 'inline',
      },
      className,
      ...classNames
    ])
  }

  const stylesObj = {
    form: getStyles([
      {
        width
      },
      () => ({
        style: {
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        },
        condition: layout !== 'inline'
      }),
      style
    ])
  }

  return (
    <form
      ref={formRef}
      className={classNamesObj.form()}
      style={stylesObj.form}

    >
      <FormContext.Provider
        value={{
          ...rest
        }}
      >
        {children && children}
      </FormContext.Provider>
      <div>
        <Button onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          submit()
        }}>submit</Button>
      </div>
    </form>
  )
}
export default Form