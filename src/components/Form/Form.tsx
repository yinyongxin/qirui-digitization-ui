import { useContext, useRef, useState } from "react"
import { Button } from "../index"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles, setObjectValueByString } from "../utils/tools"
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

  const formRef = useRef<HTMLFormElement>(null)
  const [initialValuesState, setInitialValuesState] = useState(initialValues)

  const submit = () => {
    // const {
    //   allValue,
    //   oldValue
    // } = setObjectValueByString(initialValues || {}, 'username', 'username', {
    //   returnAllValue: true,
    //   returnOldValue: true,
    // })
    // formRef.current['username'].value = 'username'
    // console.log('allValue', dataRef.current.allValue);
    // console.log('initialValuesState', initialValuesState);
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
        inForm: true
      }}
    >
      <form
        ref={formRef}
        className={classNamesObj.form()}
        style={stylesObj.form}
      >
        {children && children}
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