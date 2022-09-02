import React from "react";
import { Select, Title, Page } from "../../components";
import ScrollIntoView from "../components/ScrollIntoView";
const SelectExemple = () => {
  return (
    <Page
      pageHeader={{
        title: '选择器 Select',
        descriptions: '当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项。',
        breadcrumb: {
          list: [
            {
              title: 'Home',
              // path: '/home'
            },
            {
              title: 'SelectExemple',
              path: '/selectExemple'
            }
          ]
        }
      }}
    >
      <ScrollIntoView>
        <Title type="tooltip" title="单选" >
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
        </Title>
        <Title type="tooltip" title="多选" >
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
        </Title>
      </ScrollIntoView>
    </Page>
  )
}
export default SelectExemple