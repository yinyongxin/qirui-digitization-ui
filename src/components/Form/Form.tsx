import { forwardRef, Ref, useContext, useImperativeHandle, useRef, useState } from "react"
import { Button } from "../index"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles, isFunction } from "../utils/tools"
import { FormContext, FormContextDefult } from "./Context"
import { FormInstance, FormPropsInterface, InnerMethodsReturnType } from "./interface"
import { DesignTypes } from "../typings"
import { useForm } from "./useForm"
import FormItem from "./FormItem"
import { useData, useIsFirst, useNotFirst } from "../utils/hooks"

const Form = <
  FormData extends unknown = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
>(
  props: FormPropsInterface<FormData>,
  ref: Ref<unknown> | undefined
) => {
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
    form,
    ...rest
  } = allField

  const {
    layout,
    columns,
    initialValues,
  } = allField

  const data = useData<{
    innerMethods?: InnerMethodsReturnType<FormData>
  }>({})
  const [test, settest] = useState('');

  const [formInstance] = useForm<FormData>(form)
  data.innerMethods = formInstance?.getInnerMethods(true)

  useIsFirst(() => {
    data?.innerMethods?.setStore(initialValues!)
    data?.innerMethods?.setInitialValues(initialValues!)
  })
  useNotFirst(() => {
    console.log('useNotFirst');
  })

  const formRef = useRef<HTMLFormElement>(null)

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

  useImperativeHandle(ref, () => {
    return formInstance;
  });

  return (
    <FormContext.Provider
      value={{
        ...rest,
        inForm: true,
        store: formInstance as any
      }}
    >
      <form
        onClick={() => {
          settest(Math.random().toString())
        }}
        ref={formRef}
        className={classNamesObj.form()}
        style={stylesObj.form}
      >
        {test}
        {children && isFunction(children) ? children?.() : children}
      </form>
    </FormContext.Provider>
  )
}

const FormComponent = forwardRef(Form);

FormComponent.displayName = 'Form';

export default FormComponent as <
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
  >(
  props: React.PropsWithChildren<FormPropsInterface<FormData>> & {
    ref?: React.Ref<FormInstance<FormData, FieldValue, FieldKey>>;
  }
) => React.ReactElement;
