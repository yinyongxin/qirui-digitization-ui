import { createContext } from "react";
import { InputCurrencyType } from "../Input/interface";
import { FormItemBaseType } from "./interface";

export const FormItemContext = createContext<FormItemBaseType & InputCurrencyType>({
  // defaultValue: ''
});