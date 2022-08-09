import React from "react";
import {
  DesignTypes
} from '../../typings/types'
import { ButtonConfig, ButtonConfigType } from "./button";
import { MessageConfig, MessageConfigType } from "./message";
import { ModalConfig, ModalConfigType } from "./modal";
import { DrawerConfig, DrawerConfigType } from "./drawer";

export type GlobalConfigType = {
  theme?: DesignTypes['Theme'],
  locale?: DesignTypes['Locale'],
  classNamePrefix?: string,
  ButtonConfig?: ButtonConfigType,
  MessageConfig?: MessageConfigType,
  ModalConfig?: ModalConfigType,
  DrawerConfig?: DrawerConfigType,
}

export const GlobalContextValue: GlobalConfigType = {
  theme: 'dark',
  locale: 'zh-CN',
  ButtonConfig,
  MessageConfig,
  ModalConfig,
  DrawerConfig,
  classNamePrefix: 'design'
}

export const GlobalContext = React.createContext<GlobalConfigType>(GlobalContextValue);