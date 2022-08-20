import React, { FC, useContext, useRef } from "react"
import { Button } from "../index"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles, getValueFormObjectByString, getValueFormObjectByStringDeep, pick, setObjectValueByString } from "../utils/tools"
import { FormContext, FormContextDefult } from "./FormContext"
import { FormPropsInterface } from "./interface"

const Form = <FormData,>(props: FormPropsInterface<FormData>) => {

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
    initialValues
  } = allField

  const formRef = useRef<HTMLFormElement>()


  const submit = () => {
    console.time()
    const valueDeep = getValueFormObjectByStringDeep(initialValues, 'arr.0.other.username')
    console.log('valueDeep', valueDeep);
    console.timeEnd()
    console.time()
    const value = getValueFormObjectByString(initialValues, 'arr.0.other.username')
    console.log('value', value);
    console.timeEnd()
    // setObjectValueByString(initialValues, 'other.username', 'newUsername')
    // console.log('initialValues', initialValues);

    // console.log('formRef', Object.keys(initialValues));
    // console.log('formRef', formRef);
    // console.log('formRef', formRef.current?.age.value);
    // console.log('formRef', formRef.current?.username.value);
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