import React from "react";
import { Icon, Page, Title, Text, Checkbox } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";
const CheckboxExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '复选框 Checkbox',
        descriptions: '在一组数据中，用户可通过复选框选择一个或多个数据。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              path: '/home'
            },
            {
              title: 'CheckboxExemple',
              path: '/exemples/radioExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title type="tooltip" title="基础用法" description="最基本的点击选中操作。" >
          <Checkbox value='base' />
        </Title>
        <Title type="tooltip" title="禁用" description="禁用复选框。" >
          <Checkbox value='disabled' disabled />
        </Title>
        <Title type="tooltip" title="单选框组" description="单选组的用法。有两种用法，可以通过 children 的方式或者 options 数组的方式。" >
          <Checkbox.Group>
            <Checkbox value='a' />
            <Checkbox value='b' />
            <Checkbox value='c' />
          </Checkbox.Group>
          <div></div>
          <Checkbox.Group defaultValue={['option2']} options={['option1', 'option2', 'option3']} />
          <div></div>
          <Checkbox.Group
            defaultValue={['value3']}
            options={[
              { label: 'label1', value: 'value1' },
              { label: 'label2', value: 'value2' },
              { label: 'label3', value: 'value3' },
            ]}
          />
        </Title>
        <Title type="tooltip" title="自定义单选框组" description="单选组的用法。有两种用法，可以通过 children 的方式或者 options 数组的方式。" >
          <Checkbox.Group
            defaultValue={['a']}
          >
            {['a', 'b', 'c'].map(item => (
              <Checkbox key={item} value={item}>
                {(checked) => {
                  return (
                    <Text type={checked ? 'success' : "error"} >
                      自定义内容{item}
                    </Text>
                  )
                }}
              </Checkbox>
            ))}

          </Checkbox.Group>
          <div></div>
          <Checkbox.Group
            defaultValue={['value2']}
            options={[
              { label: 'label1', value: 'value1' },
              { label: 'label2', value: 'value2' },
              { label: 'label3', value: 'value3' },
            ]}
            customLabel={(checked, label) => {
              return (
                <Text type={checked ? 'success' : "error"} >
                  {label}
                </Text>
              )
            }}
          />
        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default CheckboxExemple