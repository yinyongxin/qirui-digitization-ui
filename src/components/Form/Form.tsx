import { useContext, useRef, useState } from "react"
import { Button } from "../index"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles, isFunction, setObjectValueByString } from "../utils/tools"
import { FormContext, FormContextDefult } from "./FormContext"
import { FormDataRef, FormPropsInterface } from "./interface"
import { useEffect } from "react"

const Form = (props: FormPropsInterface) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

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
    columns,
    initialValues,
  } = allField

  const dataRef = useRef<FormDataRef>({
    allValue: initialValues
  })

  const formRef = useRef<HTMLFormElement & {
    [key in string]: HTMLInputElement
  }>(null)
  const [formData, setFormData] = useState(initialValues)

  const submit = () => {
    const {
      allValue,
      oldValue
    } = setObjectValueByString(formData || {}, 'username', 'username', {
      returnAllValue: true,
      returnOldValue: true,
    })
    setFormData(() => ({ ...allValue }))
    console.log('formData', formData);

    formRef.current && (formRef.current['username'].value = 'username')

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
        width,

      },
      {
        style: {
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        },
        condition: layout !== 'inline'
      },
      style
    ])
  }

  return (
    <FormContext.Provider
      value={{
        ...rest,
        inForm: true,
        formData,
        setFormData
      }}
    >
      <form
        ref={formRef}
        className={classNamesObj.form()}
        style={stylesObj.form}
      >
        {children && isFunction(children) ? children?.(formData) : children}
        <div>
          <Button onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            submit()
          }}>submit</Button>
        </div>
      </form>
    </FormContext.Provider>
  )
}
export default Form