import React, { useState } from "react";
import { Page, Input, Title, Upload } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";
const IconExemple = () => {
  const [value, setValue] = useState()
  return (
    <Page
      pageHeader={{
        title: '输入框 Input',
        descriptions: '基本表单组件，并在原生控件基础上进行了功能扩展，可以组合使用。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'InputNumberExemple',
              path: '/inputNumberExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title type="tooltip" title="基本Icon status" >
          <div className="flex gap20">
            <Input.Number />
            <Input.Number defaultValue={1212} />
            <Input.Number width={520} borders={{
              top: false,
              bottom: false,
              left: false,
              right: false
            }} placeholder="点击搜索工单" />
          </div>
        </Title>
        <Title type="tooltip" title="前缀(prefix) 后缀(suffix)" >
          <div className="flex gap20">
            <Input.Number
              prefix={'prefix'}
            />
            <Input.Number
              suffix={'suffix'}
            />
          </div>
        </Title>
        <Title type="tooltip" title="前置(addBefore) 后置(addAfter)" >
          <div className="flex gap20">
            <Input.Number
              addBefore={'addBefore'}
            />
            <Input.Number
              addAfter={'addAfter'}
            />

          </div>
        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default IconExemple