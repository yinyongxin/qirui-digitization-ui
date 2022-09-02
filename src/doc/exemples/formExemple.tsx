import React, { useState } from "react";
import { Button, Form, Image, Input, Page, Select, Title, Upload } from "../../components";
import FormItem from "../../components/Form/FormItem";
import ScrollIntoView from "../components/ScrollIntoView";

const FormExemple = () => {
  const initialValues = {
    username: 'yyx',
    // age: 'age',
    // address: 'address',
    // other: {
    //   // username: 'otheryyx',
    //   // age: 'otherage'
    // },
    // arr: [{
    //   username: 'arryyx',
    //   age: 'arrage',
    // }]
  }
  const [message, setMessage] = useState('error')

  const [form] = Form.useForm()


  return (
    <Page
      pageHeader={{
        title: '表单 Form',
        descriptions: '具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'FormExemple',
              path: '/formExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title type="tooltip" title="基本Form" >
          <div className="flex flex-column gap20">
            <Form
              width={'100%'}
              initialValues={initialValues}
              // onValuesChange={(value, allValue, oldValue) => {
              //   console.log('onValuesChange', value, allValue, oldValue);
              // }}
              // onChange={() => {
              //   console.log('onChange');
              // }}
              form={form}
            // layout='vertical'
            // layout='inline'
            // columns={2}
            >
              <FormItem
                label="Username"
                name="username"
                message="message"
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                message={message}
              >
                <Input />
              </FormItem>
              <FormItem
                label="address"
                name="address"
              >
                <Input />
              </FormItem>
            </Form>
            <div>
              <Button
                onClick={() => {
                  // form.setFieldsValue({
                  //   username: Math.random().toString(),
                  //   age: 21351542345324523523524352345234534235,
                  //   address: 'addrescascascs'
                  // })
                  console.log(form.getFields());


                }}
              >setMessage</Button>
            </div>
          </div>
        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default FormExemple