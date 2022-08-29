import { createContext } from "react";
import { FormContextType, FormItemContextType } from "./interface";
export const FormContextDefult: FormContextType = {
  layout: 'horizontal',
  labelAlign: 'right',
  requiredSymbol: true,
  columns: 1,
  inForm: false,
  updataFieldsName: []
}

export const FormContext = createContext<FormContextType>(FormContextDefult)
FormContext.displayName = 'FormContext'


export const FormItemContext = createContext<FormItemContextType>({
  name: '',
  inFormItem: false,
  validateStatus: 'error'
});
FormItemContext.displayName = 'FormItemContext'