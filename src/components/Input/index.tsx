import { FC, HTMLInputTypeAttribute, ReactNode, useContext } from "react"
import { GlobalContext } from "../config/globalContext"
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

  const formItemContent = useContext(FormItemContext);

  const {
    type = 'text',
    width = 400,
    ...rest
  } = props

  const prefixCls = `${classNamePrefix}-input`

  const classNamesObj = {
    inputComponent: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}`,
      ...classNames
    ]),
  }

  return (
    <div style={{ width }} className={classNamesObj.inputComponent()}>
      {inputs[type]?.({ ...rest, ...formItemContent })}
    </div>
  )
}
export default Input