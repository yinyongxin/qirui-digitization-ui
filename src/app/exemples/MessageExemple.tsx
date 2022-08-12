import React from "react";
import { Button, Message, Title } from "../../components";

const MessageExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="四种基本类型" >
        <div className="flex gap20">
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
              Message.error('ErrorMessage')
            }}
          >ErrorMessage</Button>
        </div>
      </Title>
      <Title type="tooltip" title="配置 禁止自动关闭" >
        <div className="flex gap20">
          <Button
            status="error"
            onClick={() => {
              Message.error({
                content: 'ErrorMessage',
                closable: true,
                autoClose: false
              })
            }}
          >ErrorMessage</Button>
        </div>
      </Title>
    </div>
  )
}
export default MessageExemple