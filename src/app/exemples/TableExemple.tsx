import React from "react";
import { Icon, Table, Title } from "../../components";

const IconExemple = () => {
  return (
    <div>
      <Title type="tooltip" title="基本Table" >
        <div>
          <Table<{
            data1: string,
            data2: string,
            data3: string,
            data4: string,
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
                    <>
                      {col.title}
                      headerCellRender
                      {index}
                    </>
                  )
                },
                bodyCellRender(col, record, { dataIndex }) {
                  return (
                    <div>
                      {record[col.dataKey]}
                      bodyCellRender
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
                title: 'align-right',
                dataKey: 'data3',
                align: "center"
              },
              {
                title: 'placeholder',
                dataKey: 'data4',
                align: "right"
              },
            ]}
            onRow={(record) => {
              return {
                onClick: () => {
                  console.log('onRow', record);
                }
              }
            }}
            placeholder='---'
            data={[
              {
                data1: 'data',
                data2: 'data',
                data3: 'data',
                data4: 'data',
              },
              {
                data1: 'data',
                data2: 'data',
                data3: 'data',
                data4: '',
              },
            ]}
          />
        </div>
      </Title>
      <Title type="tooltip" title="onTbodyTdCell onTbodyTdCell" >
        <div>
          <Table<{
            col1: string,
            col2: string,
          }>
            columns={[
              {
                title: 'row1',
                dataKey: 'col1',
                onTheadTdCell: (record) => {
                  return {
                    onClick: (e) => {
                      console.log('onTheadTdCell', record);
                    }
                  }
                }
              },
              {
                title: 'row2',
                dataKey: 'col2',
                onTbodyTdCell: (record) => {
                  return {
                    onClick: (e) => {
                      console.log('onTbodyTdCell', record);
                    }
                  }
                }
              },
            ]}
            data={[
              {
                col1: 'col1-row1',
                col2: 'col2-row2',
              },
              {
                col1: 'col1-row1',
                col2: 'col2-row2',
              },
            ]}
          />
        </div>
      </Title>
      <Title type="tooltip" title="列宽度" >
        <div style={{ width: 1000 }}>
          <Table<{
            col1: string,
            col2: string,
          }>
            borders={{
              // top: false,
              // right: false,
              // bottom: false,
              // left: false,
              // thead: false,
              // tbody: false,
              vertical: true,
            }}
            borderWidth={4}
            columns={[
              {
                title: 'row1',
                dataKey: 'col1',
                width: '200'
              },
              {
                title: 'row2',
                dataKey: 'col2',
              },
            ]}
            data={[
              {
                col1: 'col1-row1',
                col2: 'col2-row2',
              },
              {
                col1: 'col1-row1',
                col2: 'col2-row2',
              },
            ]}
          />
        </div>
      </Title>
    </div>
  )
}
export default IconExemple