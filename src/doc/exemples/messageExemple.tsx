import React from "react";
import { Button, Message, Title, Page } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";
const MessageExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '全局提示 Message',
        descriptions: '由用户的操作触发的轻量级全局反馈。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'MessageExemple',
              path: '/messageExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title type="tooltip" title="四种基本类型" >
          <div className="flex gap20">
            <Button
              onClick={() => {
                Message.default('DefaultMessage')
              }}
            >DefaultMessage</Button>
            <Button
              status="primary"
              onClick={() => {
                Message.primary('PrimaryMessage')
              }}
            >PrimaryMessage</Button>
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
      </ScrollIntoView>
    </Page>
  )
}
export default MessageExemple