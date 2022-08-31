import React, { FC, Key, useContext, useEffect, useState } from "react"
import { isPromise } from "util/types"
import { Pagination } from ".."
import { GlobalContext } from "../config/globalContext"
import { DesignTypes } from "../typings"
import { useData } from "../utils/hooks"
import { ClassNameType, getClassNames, isBoolean, isFunction } from "../utils/tools"
import { TablePropsType } from "./interface"

const Table = <
  T extends unknown = any,
  TValue = T[keyof T],
  TKey extends DesignTypes['KeyType'] = keyof T
>(props: TablePropsType<T, TValue, TKey>) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-table`

  const {
    className,
    columns,
    data,
    align = "left",
    rowKey,
    borders,
    onRow,
    placeholder,
    borderWidth = 1,
    style,
    pagination,
    ...rest
  } = props

  const tableBorders = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    thead: true,
    tbody: true,
    vertical: false,
    ...borders
  }

  const [tableData, setTableData] = useState<(T | any)[]>([])
  const dataAsync = useData({
    pagination: {
      current: 1,
      pageSize: 10
    },
    search: {}
  })

  const [total, setTotal] = useState(0)

  const getTableData = async () => {
    if (isFunction(data)) {
      try {
        let res = await data(dataAsync.pagination, dataAsync.search)
        setTableData(res?.list)
        setTotal(res?.total)
      } catch (error) {
      }
    }
  }

  useEffect(() => {
    if (!isFunction(data)) {
      setTableData(data)
    }
  }, [data])

  const tableClassName = {
    table: getClassNames([
      `${prefixCls}`,
      {
        [`${prefixCls}-border-top`]: tableBorders.top,
        [`${prefixCls}-border-right`]: tableBorders.right,
        [`${prefixCls}-border-bottom`]: tableBorders.bottom,
        [`${prefixCls}-border-left`]: tableBorders.left,
      },
      className || ''
    ]),


    thead: getClassNames([
      `${prefixCls}-thead`,
    ]),
    theadTr: getClassNames([
      `${prefixCls}-theadTr`,
    ]),

    theadTh: (className: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-theadTh`,
      {
        [`${prefixCls}-border-bottom`]: tableBorders.thead,
      },
      ...className,
    ]),


    tbody: getClassNames([
      `${prefixCls}-tbody`,
    ]),
    tbodyTr: getClassNames([
      `${prefixCls}-tbodyTr`,
    ]),
    tbodyTd: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-tbodyTd`,
      ...classNames,
    ]),


    tfoot: getClassNames([
      `${prefixCls}-tfoot`,
    ]),
    tfootTr: getClassNames([
      `${prefixCls}-tfootTr`,
    ]),
    tfootTd: (className: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-tfootTd`,
      `${prefixCls}-border-top`,
      ...className,
    ]),



  }

  const theadRender = () => {
    return (
      <thead className={tableClassName.thead}>
        <tr className={tableClassName.theadTr}>
          {columns.map((column, columnIndex) => {
            const thStyle = {
              ...(column.width ? { width: column.width } : {}),
              borderWidth
            }
            return (
              <th
                style={thStyle}
                key={column.key || column.dataKey as Key}
                className={tableClassName.theadTh([
                  `${prefixCls}-align-${column.align || align}`,
                  {
                    [`${prefixCls}-border-left`]: tableBorders.vertical && columnIndex !== 0,
                  }
                ])}
                {...column?.onTheadTdCell?.(column, columnIndex)}
              >
                {
                  column.headerCellRender?.(column, columnIndex) ||
                  column.title ||
                  placeholder ||
                  column.placeholder
                }
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }

  const tbodyRender = () => {
    return (
      <tbody className={tableClassName.tbody}>
        {tableData.map((dataItem, dataIndex) => {
          return (
            <tr
              key={isFunction(rowKey) ? rowKey?.(dataItem) : (rowKey && dataItem[rowKey]) || dataIndex}
              className={tableClassName.tbodyTr}
              {...onRow?.(dataItem, dataIndex)}
            >
              {columns.map((column, columnIndex) => (
                <td
                  style={{ borderWidth }}
                  key={column.key || columnIndex}
                  className={tableClassName.tbodyTd([
                    `${prefixCls}-align-${column.align || align}`,
                    {
                      [`${prefixCls}-border-bottom`]: tableBorders.tbody && (dataIndex + 1) !== tableData.length,
                      [`${prefixCls}-border-left`]: tableBorders.vertical && columnIndex !== 0,
                    }
                  ])}
                  {...column?.onTbodyTdCell?.(column, dataItem, dataIndex)}
                >
                  {
                    column.bodyCellRender?.(column, dataItem, { columnIndex, dataIndex }) ||
                    dataItem[column.dataKey] ||
                    placeholder ||
                    column.placeholder
                  }
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    )
  }

  const tfootRender = () => {
    return (
      <tfoot className={tableClassName.tfoot}>
        <tr className={tableClassName.tfootTr}>
          {columns.map((column, columnIndex) => {
            const colData = []
            for (let index = 0; index < tableData.length; index++) {
              const element = tableData[index][column.dataKey];
              colData[index] = element
            }
            return (
              <td
                style={{ borderWidth }}
                key={column.key || column.dataKey as Key}
                className={tableClassName.tfootTd([
                  `${prefixCls}-align-${column.align || align}`,
                  {
                    [`${prefixCls}-border-left`]: tableBorders.vertical && columnIndex !== 0,
                  }
                ])}
                {...column?.onTfootTdCell?.(column, colData, columnIndex)}
              >
                {
                  column.footerCellRender?.(column, colData, columnIndex) ||
                  column.title ||
                  placeholder ||
                  column.placeholder
                }
              </td>
            )
          })}
        </tr>
      </tfoot>
    )
  }

  const paginationRender = () => {
    return pagination && (isBoolean(pagination) ? (
      <Pagination />
    ) : (
      <Pagination total={total} {...pagination} onChange={(current, pageSize) => {
        dataAsync.pagination = {
          current,
          pageSize
        }
        getTableData()
      }} />
    ))
  }


  return (
    <>
      <table
        style={{ borderWidth, ...style }}
        className={tableClassName.table}
        {...rest}
      >
        {theadRender()}
        {tbodyRender()}
        {tfootRender()}
      </table>
      {paginationRender()}
    </>
  )
}
export default Table