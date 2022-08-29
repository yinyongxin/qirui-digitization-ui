import { FC, ReactNode, useContext, useState } from "react"
import { useMemo } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles, isBoolean, isFunction } from "../utils/tools"
import { FormContext } from "./Context"
import { FormItemContext } from "./Context"
import { FormItemPropsType } from "./interface"

const FormItem: FC<FormItemPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);
  const formContext = useContext(FormContext);
  const prefixCls = `${classNamePrefix}-formItem`

  const allField = {
    ...formContext,
    ...props,
  }

  const {
    children,
    labelWidth = '15%',
    labelAlign = 'right',
    colon,
    layout,
    className = '',
    style = {},
    requiredSymbol,
    width,
    label,
    message: messageProps,
    initialValues,
    validateStatus: validateStatusProps = 'error',
    ...rest
  } = allField

  const {
    name,
    store,
    updataFieldsName,
    onValuesChange
  } = allField

  const [message, setMessage] = useState(messageProps)
  const [value, setValue] = useState(store?.getFieldValue(name))
  const [validateStatus, setValidateStatus] = useState(validateStatusProps)

  const classNamesObj = {
    formItem: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      className,
      ...classNames
    ]),
    label: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-label`,
      {
        'justify-start': layout !== 'horizontal' && labelAlign === 'left',
        'justify-end': layout === 'horizontal' && labelAlign === 'right',
        [`${classNamePrefix}-padding-bottom-sm`]: layout === 'vertical'
      },
      ...classNames,
    ]),
    message: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-message`,

      {
        [`${prefixCls}-message-row-column`]: layout !== 'vertical' && !!label,
        [`${prefixCls}-message-${validateStatus}`]: validateStatus !== 'validating',
      },
      ...classNames,
    ]),
  }

  const labelRender = () => {
    if (!label) {
      return
    }
    return (
      <label className={classNamesObj.label()} htmlFor={name}>
        <div className={`${prefixCls}-label-text`}>
          {isFunction(label) ? label('validating') : label}
        </div>
        {colon && (isBoolean(colon) && ':') || (!isBoolean(colon) && colon)}
      </label>
    )
  }

  // 提示信息渲染
  const getMessage = () => {
    let res: ReactNode = message
    if (messageProps) {
      res = messageProps
    }
    return (
      <div className={classNamesObj.message()}>
        {res}
      </div>
    )
  }

  // 监听数据更新 并做出相应
  useMemo(() => {
    if (updataFieldsName.findIndex(updateFieldName => updateFieldName === name) !== -1) {
      setValue(store?.getFieldValue(name))
      onValuesChange?.(store?.getFieldsValue(updataFieldsName), store?.getFields(), store?.getOldFieldsValue(updataFieldsName))
    }
  }, [updataFieldsName])

  return (
    <FormItemContext.Provider
      value={{
        ...rest,
        value,
        inFormItem: true,
        validateStatus
      }}
    >
      <div
        className={classNamesObj.formItem()}
        style={getStyles([
          style,
          {
            width,
          },
          {
            style: {
              gridTemplateColumns: `${label ? labelWidth : ''} auto`
            },
            condition: layout === 'horizontal'
          },
          {
            style: {
              gridTemplateColumns: label ? 'auto auto' : 'auto'
            },
            condition: layout === 'inline'
          }
        ])}
      >
        {labelRender()}
        <main>
          {children && isFunction(children) ? children?.(store?.getFieldsValue(updataFieldsName)) : children}
        </main>
        {getMessage()}
      </div>

    </FormItemContext.Provider>
  )
}

export default FormItem