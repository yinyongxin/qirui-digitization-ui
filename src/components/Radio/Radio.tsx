import { useContext, useEffect, useState } from "react"
import { FormContext } from "../Form/Context";
import { FormItemContext } from "../Form/Context";
import { GlobalContext } from "../config/globalContext"
import { RadioGroupContext } from './Context'
import { ClassNameType, getClassNames, getValueIfQualified, omit, isBoolean, isUndefined, isFunction } from "../utils/tools";
import { RadioPropsType } from "./interface"

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
    children,
  } = props

  const [checked, setChecked] = useState(defaultChecked || checkedProps || radioGroupContext.value === value || false)

  useEffect(() => {
    setChecked(checkedProps!)
  }, [checkedProps])

  useEffect(() => {
    setChecked(radioGroupContext?.value === value || defaultChecked || false)
  }, [radioGroupContext?.value])

  const classNamesObj = {
    radioComponent: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      className,
      ...classNames,
    ]),
    radio: (classNames: ClassNameType[] = []) => getClassNames([
      inputAttributes?.className,
      ...classNames,
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
    className: classNamesObj.radio(),
    value,
    checked,
    onChange: (e) => {
      onChange && onChange(e.target.checked, e)
      radioGroupContext?.onCheckedChange?.(e.target.value)
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
      className={classNamesObj.radioComponent()}
    >
      <input {...inputProps} />
      <span>{value}</span>
    </div>
  )
}
export default Radio