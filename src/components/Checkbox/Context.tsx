import { type } from "os";
import { createContext } from "react";
import { CheckboxGroupContextType } from "./interface";

const defaultValue: CheckboxGroupContextType = {
  name: '',
  inCheckboxGroup: false
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextType>(defaultValue)

CheckboxGroupContext.displayName = 'CheckboxGroupContext'