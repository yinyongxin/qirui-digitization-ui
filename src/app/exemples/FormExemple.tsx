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
              layout='vertical'
              columns={2}
            >
              <FormItem
                label="Name"
                name="name"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Select
                  options={[
                    {
                      label: 'Label1',
                      value: '1',
                    },
                    {
                      label: 'Label2',
                      value: '2',
                    },
                  ]}
                  onValueChange={(newValue) => {
                    console.log('newValue', newValue);
                  }}
                />
              </FormItem>
            </Form>

            <Form
              width={1000}
              initialValues={{
                name: 'yyx',
                age: 20
              }}
              layout='vertical'
            >
              <FormItem
                label="Name"
                name="name"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Select
                  options={[
                    {
                      label: 'Label1',
                      value: '1',
                    },
                    {
                      label: 'Label2',
                      value: '2',
                    },
                  ]}
                  onValueChange={(newValue) => {
                    console.log('newValue', newValue);
                  }}
                />
              </FormItem>
            </Form>

            <Form
              width={1000}
              initialValues={{
                name: 'yyx',
                age: 20
              }}
              layout='inline'
            // columns={5}
            >
              <FormItem
                label="Name"
                name="name"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Input />
              </FormItem>
              <FormItem
                label="Age"
                name="age"
                colon
              >
                <Select
                  options={[
                    {
                      label: 'Label1',
                      value: '1',
                    },
                    {
                      label: 'Label2',
                      value: '2',
                    },
                  ]}
                  onValueChange={(newValue) => {
                    console.log('newValue', newValue);
                  }}
                />
              </FormItem>
            </Form>
            <div>

              <Input />
            </div>
          </div>
        </div>
      </Title>
    </div>
  )
}
export default FormExemple