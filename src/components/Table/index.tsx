import React, { FC, Key, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { ClassNamesType, getClassNames, isFunction } from "../utils/tools"
import { TablePropsType } from "./interface"

const Table = <T,>(props: TablePropsType<T>) => {

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
    ...rest
  } = props

  const tableBorders = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    thead: true,
    tbody: true,
    ...borders
  }

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
    theadTh: (className: string[]) => getClassNames([
      `${prefixCls}-theadTh`,
      `${prefixCls}-align-${align}`,
      ...className,
      {
        [`${prefixCls}-border-bottom`]: tableBorders.thead,
      }
    ]),
    tbody: getClassNames([
      `${prefixCls}-tbody`,
    ]),
    tbodyTr: getClassNames([
      `${prefixCls}-tbodyTr`,
    ]),
    tbodyTd: (classNames: ClassNamesType) => getClassNames([
      `${prefixCls}-tbodyTd`,
      `${prefixCls}-align-${align}`,
      ...classNames,
    ]),
  }

  const theadRender = () => {
    return (
      <thead className={tableClassName.thead}>
        <tr className={tableClassName.theadTr}>
          {columns.map((column, columnIndex) => {
            return (
              <th
                key={column.key || column.dataKey as Key}
                className={tableClassName.theadTh([
                  `${prefixCls}-align-${column.align}`
                ])}
              >
                {column.headerCellRender?.(column, columnIndex) || column.title}
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
        {data.map((dataItem, dataIndex) => {
          return (
            <tr key={isFunction(rowKey) ? rowKey?.(dataItem) : (rowKey && dataItem[rowKey]) || dataIndex} className={tableClassName.tbodyTr}>
              {columns.map((column, columnIndex) => (
                <td
                  key={column.key || columnIndex}
                  className={tableClassName.tbodyTd([
                    `${prefixCls}-align-${column.align}`,
                    {
                      [`${prefixCls}-border-bottom`]: tableBorders.tbody && (dataIndex + 1) !== data.length,
                    }
                  ])}
                >
                  {column.bodyCellRender?.(column, dataItem, { columnIndex, dataIndex }) || dataItem[column.dataKey]}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    )
  }

  return (
    <table
      className={tableClassName.table}
      {...rest}
    >
      {theadRender()}
      {tbodyRender()}
    </table>
  )
}
export default Table