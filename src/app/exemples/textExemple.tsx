import React from "react";
import { Icon, Page, Title, Text } from "../../components";

const IconExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '文字 Text',
        descriptions: '这里有 fontawesome 内置的免费图标。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
            },
            {
              title: 'TextExemple',
              path: '/textExemple'
            }
          ]
        }
      }}
    >
      <Title type="tooltip" title="基本Icon status" >
        <div className="flex gap20">
          <Text type='default'>default</Text>
          <Text type='secondary'>secondary</Text>
          <Text type='base'>base</Text>
          <Text type='error'>error</Text>
          <Text type='success'>success</Text>
          <Text type='warning'>warning</Text>
          <Text underline>underline</Text>
          <Text delete>underline</Text>
        </div>
      </Title>
    </Page>
  )
}
export default IconExemple