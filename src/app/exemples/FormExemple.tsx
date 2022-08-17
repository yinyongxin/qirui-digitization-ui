import React from "react";
import { Form, Icon, Input, Select, Title } from "../../components";

const FormExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Icon status" >
        <div className="flex gap20">
          <div>
            <Form>
              <Input label="Name" name="name" />
              <Input label="Age" name="age" type="number" />
              <Input label="time" name="age" type="time" />
              <Input label="radio" name="age" type="radio" />
              <Input label="checkbox" name="age" type='checkbox' />
              <Input label="checkbox" name="age" type="checkbox" />
              <Select
                name="select"
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
              />
            </Form>
          </div>
        </div>
      </Title>
    </div>
  )
}
export default FormExemple