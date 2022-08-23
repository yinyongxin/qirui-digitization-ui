import { useContext, useRef, useState } from "react"
import { Button } from "../index"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles } from "../utils/tools"
import { FormContext, FormContextDefult } from "./FormContext"
import { FormDataRef, FormPropsInterface } from "./interface"

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
  // const [initialValuesState, setInitialValuesState] = useState(initialValues)

  const submit = () => {
    console.log('allValue', dataRef.current.allValue);
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
          ...rest,
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