import React from "react";
import { Form, Icon, Input, Select, Title } from "../../components";
import FormItem from "../../components/Form/FormItem";

const FormExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Icon status" >
        <div className="flex gap20">
          <div>
            <Form
              width={1000}
              initialValues={{
                name: 'yyx',
                age: 20
              }}
              colon
              layout='vertical'
              columns={2}
            >
              <FormItem
                label="NameNameNameNameNameName"
                name="name"
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
              >
                <Input />
              </FormItem>
            </Form>
            <FormItem
              label="Age"
              name="age"
            >
              <Input />
            </FormItem>
            <Input />
          </div>
        </div>
      </Title>
    </div>
  )
}
export default FormExemple