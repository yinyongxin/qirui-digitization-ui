import { useContext, useEffect, useRef, useState } from "react"
import { FormContext } from "../Form/Context";
import { FormItemContext } from "../Form/Context";
import { GlobalContext } from "../config/globalContext"
import { RadioGroupContext } from './Context'
import { ClassNameType, getClassNames, omit, isFunction } from "../utils/tools";
import { RadioPropsType } from "./interface"

/**
 * 单选框
 * @param props 
 * @param ref 
 * @returns 
 */
const Radio = (props: RadioPropsType, ref: any) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);
  const prefixCls = `${classNamePrefix}-radio`

  const formItemContent = useContext(FormItemContext);
  const formContent = useContext(FormContext);
  const radioGroupContext = useContext(RadioGroupContext);

  const {
    name = radioGroupContext.name,
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

  const [checked, setChecked] = useState(defaultChecked || checkedProps || radioGroupContext.value === value || false)

  useEffect(() => {
    setChecked(checkedProps!)
  }, [checkedProps])

  useEffect(() => {
    setChecked(radioGroupContext?.value === value || defaultChecked || false)
  }, [radioGroupContext?.value])

  const classNamesObj = {
    radioComp: getClassNames([
      `${prefixCls}`,
      {
        [`${prefixCls}-disabled`]: disabled
      },
      className,
    ]),
    radio: getClassNames([
      `${prefixCls}-radio`,
      {
        [`${prefixCls}-radio-checked`]: checked
      }
    ]),
    radioInput: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-input`,
      inputAttributes?.className,
      ...classNames,
    ]),
    label: getClassNames([
      `${prefixCls}-label`,
    ]),
  }

  const innerMethods = formContent.store?.getInnerMethods()

  const inFormObj = {
    valueChange: () => {
      innerMethods?.innerSetFieldValue(name, value)
      formContent?.onChange?.({ [name]: value }, formContent.store?.getFields(), { [name]: value })
    }
  }
  const inputProps: JSX.IntrinsicElements['input'] = {
    type: 'radio',
    name,
    id: name,
    ref: inputRef,
    className: classNamesObj.radioInput(),
    value,
    checked,
    onChange: (e) => {
      onChange && onChange(e.target.checked, e)
      radioGroupContext?.onCheckedChange?.(value)
      inFormObj?.valueChange()
      if (!radioGroupContext.inRadioGroup) {
        setChecked(e.target.checked)
      }
    },
    ...omit(inputAttributes || {}, ['className'])
  }

  return (
    <div
      style={style}
      className={classNamesObj.radioComp}
      onClick={() => {
        !disabled && inputRef.current?.click()
      }}
    >
      <input {...inputProps} />
      {isFunction(children) ? children(checked) : (
        <>
          <span className={classNamesObj.radio}></span>
          <span className={classNamesObj.label}>
            {children || value}
          </span>
        </>
      )}
    </div>
  )
}
export default Radio