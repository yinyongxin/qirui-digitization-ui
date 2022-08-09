import React from "react";
import {
  DesignTypes
} from '../../typings/types'
import { ButtonConfig, ButtonConfigType } from "./button";
import { MessageConfig, MessageConfigType } from "./message";
import { ModalConfig, ModalConfigType } from "./modal";

export type GlobalConfigType = {
  theme?: DesignTypes['Theme'],
  locale?: DesignTypes['Locale'],
  classNamePrefix?: string,
  ButtonConfig?: ButtonConfigType,
  MessageConfig?: MessageConfigType,
  ModalConfig?: ModalConfigType,
}

export const GlobalContextValue: GlobalConfigType = {
  theme: 'dark',
  locale: 'zh-CN',
  ButtonConfig,
  MessageConfig,
  ModalConfig,
  classNamePrefix: 'design'
}

export const GlobalContext = React.createContext<GlobalConfigType>(GlobalContextValue);