import { MessageItemPropsType } from "../../Message/MessageItem/interface"

export type MessageConfigType = Partial<Omit<MessageItemPropsType, 'id' | 'key' | 'operationRenter' | 'close'>>

export const MessageConfig: MessageConfigType = {
  autoCloseTime: 2000,
  closable: true,
  content: "Message",
  status: 'default',
  showIcon: true,
  autoClose: true,
}