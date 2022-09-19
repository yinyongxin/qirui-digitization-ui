import { type } from "os";
import { createContext } from "react";
import { RadioGroupContextType } from "./interface";

const defaultValue: RadioGroupContextType = {
  name: '',
  inRadioGroup: false
}

export const RadioGroupContext = createContext<RadioGroupContextType>(defaultValue)

RadioGroupContext.displayName = 'RadioGroupContext'