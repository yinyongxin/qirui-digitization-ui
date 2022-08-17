import { FC, HTMLInputTypeAttribute, ReactNode, useContext } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames } from "../utils/tools";
import InputText from "./InputText";
import { InputPropsType } from "./interface"

const inputs: Partial<Record<HTMLInputTypeAttribute, ((props: unknown) => ReactNode)>> = {
  text: <P,>(props: P) => <InputText {...props} />,
}

const Input: FC<InputPropsType> = (props, ref) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const {
    type = 'text',
    label = '',
    ...rest
  } = props

  const labelKey = `input-${type}-${label}`

  const prefixCls = `${classNamePrefix}-input`

  const classNamesObj = {
    inputComponent: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      ...classNames
    ]),
    label: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-label`,
      ...classNames,
    ]),
  }

  return (
    <div className={classNamesObj.inputComponent()}>
      {label && (
        <label className={classNamesObj.label()} htmlFor={labelKey}>{label}</label>
      )}
      {inputs[type]?.(rest)}
    </div>
  )
}
export default Input