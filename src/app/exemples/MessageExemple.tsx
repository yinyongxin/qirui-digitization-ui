import React from "react";
import { Button, Message } from "../../components";

const MessageExemple = () => {
  return (
    <div className="exemple">
      <Button
        onClick={() => {
          console.log('notDisabledBtn');
          Message.default('DefaultMessage')
        }}
      >DefaultMessage</Button>
      <Button
        status="success"
        onClick={() => {
          Message.success('SuccessMessage')
        }}
      >SuccessMessage</Button>
      <Button
        status="warning"
        onClick={() => {
          Message.warning('WarningMessage')
        }}
      >WarningMessage</Button>
      <Button
        status="error"
        onClick={() => {
          Message.error({
            content: 'ErrorMessage',
            closable: true,
            autoCloseTime: 10000,
            autoClose: false
          })
        }}
      >ErrorMessage</Button>
    </div>
  )
}
export default MessageExemple