import React, { useState } from "react";
import { Button, Form, Icon, Input, Select, Title } from "../../components";
import FormItem from "../../components/Form/FormItem";

const FormExemple = () => {
  const initialValues = {
    username: 'yyx',
    age: 'age',
    other: {
      // username: 'otheryyx',
      // age: 'otherage'
    },
    arr: [{
      username: 'arryyx',
      age: 'arrage',
    }]
  }
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
              columns={2}
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
                label="OtherUsername"
                name="other.username"
              >
                <Input />
              </FormItem>
              <FormItem
                label="OtherAge"
                name="other.age"
              >
                <Input />
              </FormItem>
              <FormItem
                label="OtherUsername"
                name="arr.0.username"
              >
                <Input />
              </FormItem>
              <FormItem
                label="OtherAge"
                name="arr.0.age"
              >
                <Input />
              </FormItem>
              <FormItem
                label="username"
                name="ascascsac"
              >
                {(formData) => {
                  return formData.username
                }}
              </FormItem>
            </Form>
            <Input />
            <Button onClick={() => {
              console.log('initialValues', initialValues);

            }}>LOG</Button>
          </div>

        </div>
      </Title>
    </div>
  )
}
export default FormExemple