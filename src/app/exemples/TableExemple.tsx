import React from "react";
import { Icon, Table, Title } from "../../components";

const IconExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Table" >
        <div style={{ width: 500 }}>
          <Table<{ data1: string, data2: string }>
            columns={[
              {
                title: 'title1',
                dataKey: 'data1'
              },
              {
                title: 'title2',
                dataKey: 'data2'
              }
            ]}
            data={[
              {
                data1: 'data1',
                data2: 'data2'
              },
            ]}
          />
        </div>
      </Title>
    </div>
  )
}
export default IconExemple