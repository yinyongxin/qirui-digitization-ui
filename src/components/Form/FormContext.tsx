import { createContext } from "react";
import { FormContextPropsType } from "./interface";

export const FormContextDefult: FormContextPropsType = {
  layout: 'horizontal',
  labelAlign: 'right',
  requiredSymbol: true,
  columns: 1
}

export const FormContext = createContext<FormContextPropsType>(FormContextDefult);