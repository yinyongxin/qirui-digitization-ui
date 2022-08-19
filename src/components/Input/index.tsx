import { FC, HTMLInputTypeAttribute, ReactNode, useContext } from "react"
import { GlobalContext } from "../config/globalContext"
import { FormContext } from "../Form/FormContext";
import { FormItemContext } from "../Form/FormItemContext";
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
    ...rest
  } = props

  // console.log('formItemContent', formItemContent);
  // console.log('formContent', formContent);

  const prefixCls = `${classNamePrefix}-input`

  const classNamesObj = {
    inputComponent: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      ...classNames
    ]),
  }

  return (
    // <div className={classNamesObj.inputComponent()}>
    <>
      {inputs[type]?.(rest)}
    </>
    // </div>
  )
}
export default Input