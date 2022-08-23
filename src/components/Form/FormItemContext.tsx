import { createContext } from "react";
import { FormItemContextType } from "./interface";

export const FormItemContext = createContext<FormItemContextType>({
  name: '',
  inFormItem: false
});
FormItemContext.displayName = 'FormItemContext'