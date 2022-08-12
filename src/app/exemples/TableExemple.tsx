import React from "react";
import { Icon, Table, Title } from "../../components";

const IconExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Table" >
        <div style={{ width: 500 }}>
          <Table<{
            data1: string,
            data2: string,
            data3: string
          }>
            borders={{
              // bottom: false
            }}
            columns={[
              {
                title: 'title1',
                dataKey: 'data1',
                headerCellRender(col, index) {
                  return (
                    <div>
                      {col.title}
                      headerCellRender
                      {index}
                    </div>
                  )
                },
                bodyCellRender(col, record, { dataIndex }) {
                  return (
                    <div>
                      {record[col.dataKey]}
                      headerCellRender
                      {dataIndex}
                    </div>
                  )
                },
              },
              {
                title: 'title2',
                dataKey: 'data2',
              },
              {
                title: 'title3',
                dataKey: 'data3',
                align: "right"
              }
            ]}
            data={[
              {
                data1: 'data-1-1',
                data2: 'data-1-2',
                data3: 'data-1-3',
              },
              {
                data1: 'data-2-1',
                data2: 'data-2-2',
                data3: 'data-2-3',
              },
            ]}
          />
        </div>
      </Title>
    </div>
  )
}
export default IconExemple