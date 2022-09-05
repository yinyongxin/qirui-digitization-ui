import React from "react";
import { Icon, Page, Title, Text, Typography } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";
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
      <ScrollIntoView>
        <Title margin={{ top: false }} type="tooltip" title="可交互" >
          <div className="flex gap20 flex-warp">
            <Text copyable type='default'>default</Text>
            <Text copyable type='secondary'>secondary</Text>
            <Text copyable type='primary'>base</Text>
            <Text copyable type='error'>error</Text>
            <Text copyable type='success'>success</Text>
            <Text copyable type='warning'>warning</Text>
            <Text copyable underline>underline</Text>
            <Text copyable delete>underline</Text>
            <Text copyable mark='warning'>mark</Text>
            <Text copyable disabled>disabled</Text>
          </div>
        </Title>
        <Title type="tooltip" title="文本 Text" >
          <div className="flex gap20">
            <Text type='default'>default</Text>
            <Text type='secondary'>secondary</Text>
            <Text type='primary'>base</Text>
            <Text type='error'>error</Text>
            <Text type='success'>success</Text>
            <Text type='warning'>warning</Text>
            <Text underline>underline</Text>
            <Text delete>underline</Text>
            <Text mark='warning'>mark</Text>
            <Text disabled>disabled</Text>
          </div>
        </Title>
        <Title title="标题 Title" bodyProps={{
          style: {
            padding: 20
          }
        }}>
          <Typography.Title margin={{ top: false }} title="基础 text"></Typography.Title>
          <Title tooltip='tooltip' title="带有tooltip"></Title>
          <Title divider={false} title="不带下边框"></Title>
          <Title title="描述" description="description" ></Title>
        </Title>
      </ScrollIntoView>
    </Page >
  )
}
export default IconExemple