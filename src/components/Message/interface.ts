import { DesignTypes } from "../typings";
import { MessageItemPropsType } from "./MessageItem/interface";

export interface MessagesBaseType {
  messages: Omit<MessageItemPropsType, 'key' | 'close'>[],
}

export interface AddMessageInterface {
  (config: Omit<MessageItemPropsType, 'key' | 'close' | 'id'>): void
}

export type MessagesConfigType =  {
  maxMessages: number,
  top?: number
}

export type MessagePropsType = MessagesBaseType

export type MessageType = Record<DesignTypes['Status'], (config: Omit<MessageItemPropsType, 'key' | 'close' | 'id'> | string) => void> & {
  /**
   * 配置Messages
   */
  config: (messagesConfig: MessagesConfigType) => void
}