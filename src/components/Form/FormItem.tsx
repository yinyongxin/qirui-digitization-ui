import React, { FC, useContext, useState } from "react"
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
  const {
    initialValues,
    ...formContextRest
  } = useContext(FormContext);

  const allValue = {
    ...formContextRest,
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
    ...rest
  } = allValue

  const {
    name,
    label,
  } = allValue

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
        defaultValue: getValueFormObjectByString(initialValues!, props.name),
        ...rest
      }}
    >
      <div
        className={classNamesObj.formItem()}
        style={{ ...style, width }}
      >
        {getLabel()}
        {children && children}
      </div>
    </FormItemContext.Provider>
  )
}
export default FormItem