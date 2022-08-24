import React, { FC, useContext, useEffect, useState } from "react"
import { useCallback } from "react"
import { useMemo } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles, getValueFormObjectByString, getValueFormObjectByStringDeep, isArray, isBoolean, isFunction, isNumber, isObject, isString } from "../utils/tools"
import { omit } from "../utils/tools"
import { FormContext } from "./FormContext"
import { FormItemContext } from "./FormItemContext"
import { FormItemPropsType } from "./interface"

const FormItem: FC<FormItemPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);
  const formContext = useContext(FormContext);

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
    message,
    initialValues,
    formData,
    ...rest
  } = allField

  const {
    name,
  } = allField

  const prefixCls = `${classNamePrefix}-formItem`
  const labelKey = `${name}`

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
        [`${prefixCls}-message-row-column`]: layout !== 'vertical'
      },
      ...classNames,
    ]),
  }

  const getLabel = () => {
    if (!label) {
      return
    }
    return (
      <label className={classNamesObj.label()} htmlFor={labelKey}>
        <div className={`${prefixCls}-label-text`}>
          {isFunction(label) ? label('validating') : label}
        </div>
        {colon && (isBoolean(colon) && ':') || (!isBoolean(colon) && colon)}
      </label>
    )
  }

  const getMessage = () => {
    let res
    if (message) {
      res = message
    }
    return (
      <div className={classNamesObj.message()}>
        message
      </div>
    )
  }

  return (
    <FormItemContext.Provider
      value={{
        ...rest,
        defaultValue: getValueFormObjectByString(formData!, props.name),
        inFormItem: true
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
              gridTemplateColumns: `${labelWidth} auto`
            },
            condition: layout === 'horizontal'
          },
          {
            style: {
              gridTemplateColumns: 'auto auto'
            },
            condition: layout === 'inline'
          }
        ])}
      >
        {getLabel()}
        {children && isFunction(children) ? children?.(formData) : children}
        {/* <div></div> */}
        {getMessage()}
      </div>

    </FormItemContext.Provider>
  )
}
export default FormItem