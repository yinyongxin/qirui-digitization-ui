import React, { FC, useContext, useEffect, useMemo, useState } from "react"
import Icon from "../../Icon";
import { GlobalContext } from "../../config/globalContext"
import { getClassNames } from "../../utils/tools"
import { MessageItemPropsType } from "./interface"

const MessageItem: FC<MessageItemPropsType> = (props, ref) => {
  const {
    MessageConfig,
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-message-item`
  const {
    status,
    closable,
    showIcon,
    content,
    operationRenter = null,
    closeAfter,
    close,
    autoCloseTime,
    autoClose,
  } = {
    ...MessageConfig,
    ...props
  }
  const messageClassName = getClassNames([
    `${prefixCls}-base`,
    `${prefixCls}-${status}`
  ])

  const iconClick = () => {
    const newProps = props
    close(props.id)
    closeAfter && closeAfter(newProps)
  }

  const autoCloseFn = () => {
    setTimeout(() => {
      close(props.id)
    }, autoCloseTime)
  }

  useEffect(() => {
    autoClose && autoCloseFn()
  }, [])

  const Opration = () => {
    let content: React.ReactNode = <></>
    if (operationRenter) {
      content = operationRenter(() => { close(props.id) })
    } else {
      if (closable) {
        content = <Icon icon="xmark" onClick={() => iconClick()} />
      }
    }
    return (
      <>
        {content}
      </>
    )
  }

  return (
    <div className="design-message-item">
      <div className={messageClassName}>
        {showIcon && (
          <div className="design-message-item-icon">
            <Icon type="regular" status={status} size={18} icon="circle-check" />
          </div>
        )}
        <div className="design-message-item-content">
          {content}
        </div>
        <div className="design-message-item-opration">
          <Opration />
        </div>
      </div>
    </div >
  )
}


export default MessageItem