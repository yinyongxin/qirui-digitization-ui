import { createContext } from "react";
import { FormContextType } from "./interface";

export const FormContextDefult: FormContextType = {
  layout: 'horizontal',
  labelAlign: 'right',
  requiredSymbol: true,
  columns: 1,
  inForm: false,
  controlled: false,
}

export const FormContext = createContext<FormContextType>(FormContextDefult);

FormContext.displayName = 'FormContext'