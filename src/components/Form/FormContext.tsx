import { createContext } from "react";
import { FormContextPropsType } from "./interface";

export const FormContextDefult: FormContextPropsType = {
  layout: 'horizontal',
  labelAlign: 'right',
  requiredSymbol: true,
}

export const FormContext = createContext<FormContextPropsType>(FormContextDefult);