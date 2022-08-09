import { ButtonBaseType } from "../../Button/interface"

export type ButtonConfigType = Partial<Pick<ButtonBaseType, 'size'>>

export const ButtonConfig: ButtonConfigType = {
  size: 'default',
}