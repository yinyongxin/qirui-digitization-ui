import { FC, HTMLInputTypeAttribute, ReactNode } from "react"
import InputText from "./InputText";
import { InputPropsType } from "./interface"

const inputs: Partial<Record<HTMLInputTypeAttribute, ((props: unknown) => ReactNode)>> = {
  text: <P,>(props: P) => <InputText {...props} />,
}

const Input: FC<InputPropsType> = (props, ref) => {

  const {
    type = 'text',
    ...rest
  } = props

  return (
    <>
      {inputs[type]?.(rest)}
    </>
  )
}
export default Input