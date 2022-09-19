import { useContext, useEffect, useId, useState } from "react";
import { GlobalContext } from "../config/globalContext";
import { FormItemContext, FormContext } from "../Form/Context";
import { ClassNameType, getClassNames, isString } from "../utils/tools";
import { RadioGroupContext } from "./Context"
import { RadioGroupType } from "./interface"
import Radio from "./Radio";

const Group = (props: RadioGroupType) => {
  const {
    children,
    defaultValue,
    value: valueProps,
    className,
    onCheckedChange,
    options,
    ...rest
  } = props

  const {
    classNamePrefix
  } = useContext(GlobalContext);
  const formItemContent = useContext(FormItemContext);
  const formContent = useContext(FormContext);

  const id = useId()

  const prefixCls = `${classNamePrefix}-radioGroup`

  const classNamesObj = {
    radioGroupComp: getClassNames([
      className,
      `${prefixCls}`,
    ]),
  }

  const [value, setValue] = useState(formItemContent?.value || defaultValue || valueProps)

  useEffect(() => {
    setValue(formItemContent?.value || valueProps)
  }, [formItemContent, valueProps])

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        name: formItemContent?.name || id,
        onCheckedChange: (value) => {
          onCheckedChange?.(value)
          setValue(value)
        },
        inRadioGroup: true
      }}
    >
      <div className={classNamesObj.radioGroupComp} {...rest}>
        {children}
        {options?.map(option => {
          if (isString(option)) {
            return (
              <Radio value={option}>{option}</Radio>
            )
          } else {
            return (
              <Radio value={option.vlaue}>{option.label}</Radio>
            )
          }
        })}
      </div>
    </RadioGroupContext.Provider>
  )
}

export default Group