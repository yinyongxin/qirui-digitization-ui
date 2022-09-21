import { useContext, useEffect, useId, useState } from "react";
import { GlobalContext } from "../config/globalContext";
import { FormItemContext, FormContext } from "../Form/Context";
import { ClassNameType, getClassNames, isFunction, isNumber, isString } from "../utils/tools";
import { CheckboxGroupContext } from "./Context"
import { CheckboxGroupType } from "./interface"
import Checkbox from "./Checkbox";

/**
 * 单选框组
 * @param props 
 * @returns 
 */
const Group = (props: CheckboxGroupType) => {
  const {
    children,
    defaultValue,
    value: valueProps,
    className,
    onCheckedChange,
    options,
    customLabel,
    ...rest
  } = props

  const {
    classNamePrefix
  } = useContext(GlobalContext);
  const formItemContent = useContext(FormItemContext);
  const formContent = useContext(FormContext);

  const id = useId()

  const prefixCls = `${classNamePrefix}-checkboxGroup`

  const classNamesObj = {
    checkboxGroupComp: getClassNames([
      className,
      `${prefixCls}`,
    ]),
  }

  const [value, setValue] = useState<any[]>([])

  const innerMethods = formContent.store?.getInnerMethods()

  const inFormObj = {
    valueChange: (newValue: any[]) => {
      innerMethods?.innerSetFieldValue(formItemContent.name, newValue)
      formContent?.onChange?.({ [formItemContent.name]: newValue }, formContent.store?.getFields(), { [formItemContent.name]: value })
    }
  }

  const optionsRender = () => {
    return options?.map(option => {
      if (isString(option) || isNumber(option)) {
        return (
          <Checkbox key={option} value={option}>
            {customLabel ? (checked) => (
              customLabel(checked, option)
            ) : option}
          </Checkbox>
        )
      } else {
        return (
          <Checkbox key={option.value} value={option.value}>
            {customLabel ? (checked) => (
              customLabel(checked, option.label)
            ) : option.label}
          </Checkbox>
        )
      }
    })
  }

  useEffect(() => {
    setValue(formItemContent?.value || defaultValue || valueProps || [])
  }, [formItemContent, valueProps])

  return (
    <CheckboxGroupContext.Provider
      value={{
        value,
        name: formItemContent?.name || id,
        onCheckedChange: (newValue) => {
          const isHas = value.findIndex(item => item === newValue?.[0]) !== -1
          let arr: any = []
          if (isHas) {
            arr = value.filter(item => item !== newValue?.[0])
          } else {
            arr = [...new Set([...value, newValue?.[0]])]
          }
          inFormObj.valueChange(arr)
          onCheckedChange?.(arr)
          setValue(arr)
        },
        inCheckboxGroup: true
      }}
    >
      <div className={classNamesObj.checkboxGroupComp} {...rest}>
        {children}
        {optionsRender()}
      </div>
    </CheckboxGroupContext.Provider>
  )
}

export default Group