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
    className = '',
    children,
    width = '100%',
    style = {},
    columns = 1,
    ...rest
  } = allField

  const {
    layout
  } = allField

  // const [initialValues, setInitialValues] = useState()

  const submit = () => {
    console.log('formRef', formRef);
    // console.log('name', formRef.current?.['name']['value']);
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
  useEffect(() => {

  }, [])

  return (
    <form
      ref={formRef}
      className={classNamesObj.form()}
      style={getStyles([
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
      ])}

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