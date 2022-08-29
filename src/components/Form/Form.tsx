import { forwardRef, Ref, useContext, useImperativeHandle, useRef, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles, isFunction } from "../utils/tools"
import { FormContext, FormContextDefult } from "./Context"
import { FormInstance, FormPropsInterface, InnerMethodsReturnType } from "./interface"
import { DesignTypes } from "../typings"
import { useForm } from "./useForm"
import { useData, useIsFirst } from "../utils/hooks"

const Form = <
  FormData extends unknown = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
>(
  props: FormPropsInterface<FormData, FieldValue, FieldKey>,
  ref: Ref<FormInstance<FormData, FieldValue, FieldKey>>
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
    innerMethods?: InnerMethodsReturnType<FormData, FieldValue, FieldKey>
  }>({})

  const formRef = useRef<HTMLFormElement>(null)

  const [updataFieldsName, setUpdataFieldsName] = useState<FieldKey[]>([])

  const [formInstance] = useForm<FormData, FieldValue, FieldKey>(form)

  const updateCallBack = () => {
    setUpdataFieldsName(data?.innerMethods?.getUpdateFieldsName())
  }

  useIsFirst(() => {
    data.innerMethods = formInstance?.getInnerMethods()
    data?.innerMethods?.setStore(initialValues!)
    data?.innerMethods?.setInitialValues(initialValues!)
    data?.innerMethods?.setUpdateCallBack(updateCallBack)
  })

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
        store: formInstance as any,
        updataFieldsName
      }}
    >
      <form
        ref={formRef}
        className={classNamesObj.form()}
        style={stylesObj.form}
      >
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
  props: React.PropsWithChildren<FormPropsInterface<FormData, FieldValue, FieldKey>> & {
    ref?: React.Ref<FormInstance<FormData, FieldValue, FieldKey>>;
  }
) => React.ReactElement;
