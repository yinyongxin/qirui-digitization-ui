import React from "react";
import { Icon, Page, Title, Text, Radio } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";
const RadioExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '单选框 Radio',
        descriptions: '在一组相关且互斥数据中，用户仅能选择一个选项。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'RadioExemple',
              path: '/radioExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title type="tooltip" title="基础用法" description="基础单选框。" >
          <Radio value='base' />
          <Radio value='disabled' disabled />
        </Title>
        <Title type="tooltip" title="单选框组" description="单选组的用法。有两种用法，可以通过 children 的方式或者 options 数组的方式。" >
          <Radio.Group value="a">
            <Radio value='a' />
            <Radio value='b' />
            <Radio value='c' />
          </Radio.Group>
          <div></div>
          <Radio.Group value='y' options={['option1', 'option2', 'option3']} />
          <div></div>
          <Radio.Group
            value='value3'
            options={[
              { label: 'label1', value: 'value1' },
              { label: 'label2', value: 'value2' },
              { label: 'label3', value: 'value3' },
            ]}
          />
        </Title>
        <Title type="tooltip" title="自定义单选框组" description="单选组的用法。有两种用法，可以通过 children 的方式或者 options 数组的方式。" >
          <Radio.Group value="a">
            <Radio value='a'>
              {(checked) => {
                return (
                  <Text type={checked ? 'success' : "error"} >
                    自定义内容a {String(checked)}
                  </Text>
                )
              }}
            </Radio>
            <Radio value='b'>
              {(checked) => {
                return (
                  <Text type={checked ? 'success' : "error"} >
                    自定义内容b {String(checked)}
                  </Text>
                )
              }}
            </Radio>
            <Radio value='c'>
              {(checked) => {
                return (
                  <Text type={checked ? 'success' : "error"} >
                    自定义内容c {String(checked)}
                  </Text>
                )
              }}
            </Radio>
          </Radio.Group>
          <div></div>
          <Radio.Group
            value='value2'
            options={[
              { label: 'label1', value: 'value1' },
              { label: 'label2', value: 'value2' },
              { label: 'label3', value: 'value3' },
            ]}
            customLabel={(checked, label) => {
              return (
                <Text type={checked ? 'success' : "error"} >
                  {label} {String(checked)}
                </Text>
              )
            }}
          />
        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default RadioExemple