import React, { FC, useContext, useEffect, useState } from "react"
import { useCallback } from "react"
import { useMemo } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getValueFormObjectByString, getValueFormObjectByStringDeep, isArray, isBoolean, isFunction, isNumber, isObject, isString } from "../utils/tools"
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
    labelWidth = 100,
    labelAlign = 'right',
    colon,
    layout,
    className = '',
    style = {},
    requiredSymbol,
    width,
    label,
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
      {
        'flex-column': layout === 'vertical',
        [`${prefixCls}-horizontal-gap`]: layout === 'horizontal',
        [`${prefixCls}-vertical-gap`]: layout === 'vertical',
        [`${prefixCls}-inline-gap`]: layout === 'inline',
      },
      ...classNames
    ]),
    label: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-label`,
      {
        'justify-start': layout !== 'horizontal' && labelAlign === 'left',
        'justify-end': layout === 'horizontal' && labelAlign === 'right'

      },
      ...classNames,
    ]),
    children: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-children`,
      ...classNames,
    ]),
  }

  const getLabel = () => {
    if (!label) {
      return
    }
    return (
      <label style={{ width: labelWidth, minWidth: labelWidth }} className={classNamesObj.label()} htmlFor={labelKey}>
        <div className={`${prefixCls}-label-text`}>
          {isFunction(label) ? label('validating') : label}
        </div>
        {colon && (isBoolean(colon) && ':') || (!isBoolean(colon) && colon)}
      </label>
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
        style={{ ...style, width }}
      >
        {getLabel()}
        {children && isFunction(children) ? children?.(formData) : children}
      </div>
    </FormItemContext.Provider>
  )
}
export default FormItem