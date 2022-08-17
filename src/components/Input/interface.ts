import { HTMLInputTypeAttribute } from "react";
import { InputTextPropsType } from "./InputText/interface";

export type InputPropsType = {
  type?: HTMLInputTypeAttribute
} & (InputTextPropsType)