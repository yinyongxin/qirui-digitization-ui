import React, { useState } from "react";
import { Button, Form, Image, Input, Select, Title, Upload } from "../../components";
import FormItem from "../../components/Form/FormItem";

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
  const [message, setMessage] = useState('')

  const [form] = Form.useForm()


  return (
    <div>
      <Title type="tooltip" title="基本Icon status" >
        <div className="flex gap20">
          <div>
            <Form<
              {
                username: string
              }
            >
              width={1000}
              initialValues={initialValues}
              onValuesChange={(value, allValue, oldValue) => {
                // console.log(value, allValue, oldValue);
              }}
              form={form}
              colon
            // layout='vertical'
            // layout='inline'
            // columns={2}
            >
              <FormItem
                label="Username"
                name="username"
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
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
          </div>
          <Button
            onClick={() => {
              console.log('getFields', form.getFields());
              form.setFieldsValue({
                username: 'asfsdf'
              })
              form.setFieldValue('age', '25')
              console.log('getFieldValue', form.getFieldValue('username'));
              console.log('getFieldValue', form.getFieldsValue(['username', 'age', 'arr.username']));
            }}
          >setMessage</Button>
        </div>
      </Title>
    </div>
  )
}
export default FormExemple