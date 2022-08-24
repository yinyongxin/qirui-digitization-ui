import { FC } from "react"
import { createRoot, Root } from 'react-dom/client';
import Portal from "../Portal";
import { getElement } from "../utils/tools";
import { AddMessageInterface, MessagesBaseType, MessagePropsType, MessageType, MessagesConfigType } from "./interface"
import MessageItem from "./MessageItem";
import { MessageItemPropsType } from "./MessageItem/interface";

let MessagesContentClassName = 'messages-show-content'

let messagesConfig: MessagesConfigType = {
  maxMessages: 10,
  top: 10
}

let messagesMap: Map<symbol, Omit<MessageItemPropsType, 'key' | 'close'>> = new Map()

let root: Root | null = null

const messageRender = () => {
  const [designMessages] = getElement(MessagesContentClassName, {
    attributes: [
      {
        qualifiedName: 'style',
        value: `top: ${messagesConfig.top}px`
      }
    ]
  })

  if (!root) {
    root = createRoot(designMessages!);
  }
  root.render(
    <Portal visible={true} container={designMessages!}>
      {[...messagesMap.values()]?.map((message, index) => {
        return (
          <MessageItem key={index} {...message} close={deleteMessage} />
        )
      })}
    </Portal>
  );
}

const addMessage: AddMessageInterface = (config) => {
  const messagesListLength = [...messagesMap.values()].length
  if (messagesListLength === messagesConfig.maxMessages) {
    return
  }
  const addSymbal = Symbol()
  messagesMap.set(addSymbal, {
    id: addSymbal,
    ...config
  })
  messageRender()
}

const deleteMessage = (id: symbol) => {
  messagesMap.delete(id)
  messageRender()
}

/**
 * 获取新的config
 * @param config MessageItem配置 或者 字符串
 * @returns 新的config
 */
const getConfig = (config: string | Omit<MessageItemPropsType, "key" | "close" | 'id'>) => {
  let newContent = null
  if (typeof config === 'string') {
    newContent = {
      content: config
    }
  } else {
    newContent = config
  }
  return newContent
}

const Message: MessageType = {
  config: (config) => {
    messagesConfig = {
      ...messagesConfig,
      ...config
    }
  },
  default: (config) => {
    addMessage({
      status: 'default',
      ...getConfig(config)
    })
  },
  success: (config) => {
    addMessage({
      status: 'success',
      ...getConfig(config)
    })
  },
  error: (config) => {
    addMessage({
      status: 'error',
      ...getConfig(config)
    })
  },
  warning: (config) => {
    addMessage({
      status: 'warning',
      ...getConfig(config)
    })
  },
}

export default Message