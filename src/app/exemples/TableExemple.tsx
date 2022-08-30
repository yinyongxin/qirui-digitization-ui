import React from "react";
import { Icon, Table, Title } from "../../components";
import { ColumnType } from "../../components/Table/interface";
type TableDataType = {
  col1: string,
  col2: string,
}
const IconExemple = () => {
  const data: TableDataType[] = [
    {
      col1: 'col1-row1',
      col2: 'col2-row1',
    },
    {
      col1: 'col1-row2',
      col2: 'col2-row2',
    },
  ]

  const columns: ColumnType<TableDataType>[] = [
    {
      title: 'col1',
      dataKey: 'col1',
      width: '200'
    },
    {
      title: 'col2',
      dataKey: 'col2',
    },
  ]
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
          <Table<TableDataType>
            columns={columns}
            data={data}
          />
        </div>
      </Title>
      <Title type="tooltip" title="列宽度" >
        <div style={{ width: 1000 }}>
          <Table<TableDataType>
            borders={{
              vertical: true,
            }}
            borderWidth={4}
            columns={columns}
            data={data}
          />
        </div>
      </Title>
      <Title type="tooltip" title="分页 pagination" >
        <div style={{ width: 1000 }}>
          <Table<TableDataType>
            columns={columns}
            data={data}
          // pagination={{
          //   sort: ['total', 'page'],
          // }}
          />
        </div>
      </Title>
      <Title type="tooltip" title="分页 pagination" >
        <div style={{ width: 1000 }}>
          <Table
            columns={columns}
            data={async (pagination, search) => {
              const list: any[] = []
              for (let index = 0; index < pagination.pageSize; index++) {
                const num = (pagination.current - 1) * pagination.pageSize + index + 1
                list.push({
                  col1: `col1-row${index + 1}--${num}`,
                  col2: `col2-row${index + 1}--${num}`,
                })
              }
              return {
                list,
                total: 15,
              }
            }}
            pagination={{
              sort: ['total', 'page'],
            }}
          />
        </div>
      </Title>
    </div>
  )
}
export default IconExemple