import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { CheckboxGroupContext } from './Context'
import { ClassNameType, getClassNames, omit, isFunction, isUndefined } from "../utils/tools";
import { CheckboxPropsType } from "./interface"
import Icon from "../Icon";

/**
 * 复选框
 * @param props 
 * @param ref 
 * @returns 
 */
const Checkbox = (props: CheckboxPropsType, ref: any) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);
  const prefixCls = `${classNamePrefix}-checkbox`

  const checkboxGroupContext = useContext(CheckboxGroupContext);

  const {
    name = checkboxGroupContext.name,
    value,
    checked: checkedProps,
    defaultChecked,
    onChange,
    style,
    className,
    inputAttributes,
    disabled,
    children,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(checkedProps!)
  }, [checkedProps])

  useEffect(() => {
    const findIndexRes = checkboxGroupContext?.value?.findIndex(item => item === value)
    const isHas = findIndexRes !== -1 && !isUndefined(findIndexRes)
    setChecked(isHas || defaultChecked || false)
  }, [checkboxGroupContext?.value])

  const classNamesObj = {
    checkboxComp: getClassNames([
      `${prefixCls}`,
      {
        [`${prefixCls}-disabled`]: disabled
      },
      className,
    ]),
    checkbox: getClassNames([
      `${prefixCls}-checkbox`,
      {
        [`${prefixCls}-checkbox-checked`]: checked
      }
    ]),
    checkboxInput: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-input`,
      inputAttributes?.className,
      ...classNames,
    ]),
    label: getClassNames([
      `${prefixCls}-label`,
    ]),
  }

  const inputProps: JSX.IntrinsicElements['input'] = {
    type: 'checkbox',
    name,
    id: name,
    ref: inputRef,
    className: classNamesObj.checkboxInput(),
    value,
    checked,
    onChange: (e) => {
      onChange && onChange(e.target.checked, e)
      checkboxGroupContext?.onCheckedChange?.(value!)
      if (!checkboxGroupContext.inCheckboxGroup) {
        setChecked(e.target.checked)
      }
    },
    ...omit(inputAttributes || {}, ['className'])
  }

  return (
    <div
      style={style}
      className={classNamesObj.checkboxComp}
      onClick={() => {
        !disabled && inputRef.current?.click()
      }}
    >
      <input {...inputProps} />
      {isFunction(children) ? children(checked) : (
        <>
          <span className={classNamesObj.checkbox}>
            {/* {checked && ( */}
            <Icon className={`${prefixCls}-icon`} size={12} icon="check"></Icon>
            {/* )} */}
          </span>
          <span className={classNamesObj.label}>
            {children || value}
          </span>
        </>
      )}
    </div>
  )
}
export default Checkbox