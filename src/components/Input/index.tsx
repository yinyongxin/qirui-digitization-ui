import { forwardRef } from "react"
import InputNumber from "./InputNumber";
import InputText from "./InputText";
import { InputPropsType } from "./interface"

const Input = (props: InputPropsType, ref: any) => {
  return <InputText {...props} />
}

const InputForWard = forwardRef(Input)

type InputRefType = typeof InputForWard

interface InputInterface extends InputRefType {
  Text: typeof InputText,
  Number: typeof InputNumber
}

const InputComp: InputInterface = InputForWard as InputInterface

InputComp.displayName = 'Input'

InputComp.Text = InputText

InputComp.Number = InputNumber

export default InputComp