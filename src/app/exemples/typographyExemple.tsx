import React from "react";
import { Icon, Page, Title, Text } from "../../components";

const IconExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '排版 Typography',
        descriptions: '用于展示标题、段落、文本内容。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
            },
            {
              title: 'TypographyExemple',
              path: '/typographyExemple'
            }
          ]
        }
      }}
    >
      <Title margin={{ top: false }} type="tooltip" title="文本" >
        <div className="flex gap20">
          <Text type='default'>default</Text>
          <Text type='secondary'>secondary</Text>
          <Text type='base'>base</Text>
          <Text type='error'>error</Text>
          <Text type='success'>success</Text>
          <Text type='warning'>warning</Text>
          <Text underline>underline</Text>
          <Text delete>underline</Text>
          <Text mark='warning'>mark</Text>
          <Text disabled>disabled</Text>
        </div>
      </Title>
    </Page >
  )
}
export default IconExemple