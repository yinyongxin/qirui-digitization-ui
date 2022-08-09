import React from "react";
import { Select } from "../../components";

const SelectExemple = () => {
  return (
    <div className="exemple">
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
      <Select
        onValueChange={(newValue) => {
          console.log('multiple newValue', newValue);
        }}
        width={400}
        multiple
        options={[
          {
            label: 'Label1',
            value: '1',
          },
          {
            label: 'Label2',
            value: '2',
          },
          {
            label: 'Label3',
            value: '3',
          },
          {
            label: 'Label4',
            value: '4',
          },
          {
            label: 'Label5',
            value: '5',
          },
          {
            label: 'Label6',
            value: '6',
          },
          {
            label: 'Label7',
            value: '7',
          },
          {
            label: 'Label8',
            value: '8',
          },
        ]}
      />
    </div>
  )
}
export default SelectExemple