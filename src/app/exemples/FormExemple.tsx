import React, { useState } from "react";
import { Button, Form, Image, Input, Select, Title, Upload } from "../../components";
import FormItem from "../../components/Form/FormItem";

const FormExemple = () => {
  const initialValues = {
    username: 'yyx',
    age: 'age',
    address: 'address',
    other: {
      // username: 'otheryyx',
      // age: 'otherage'
    },
    arr: [{
      username: 'arryyx',
      age: 'arrage',
    }]
  }
  const [message, setMessage] = useState('')
  return (
    <div>
      <Title type="tooltip" title="基本Icon status" >
        <div className="flex gap20">
          <div>
            <Form
              width={1000}
              initialValues={initialValues}
              onValuesChange={(value, allValue, oldValue) => {
                // console.log(value, allValue, oldValue);
              }}
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
          {/* <Button
            onClick={() => {
              setMessage(Math.random().toString())
            }}
          >setMessage</Button> */}
        </div>
      </Title>
    </div>
  )
}
export default FormExemple