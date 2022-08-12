import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { getClassNames } from "../utils/tools"
import { TablePropsType } from "./interface"

const Table = <T,>(props: TablePropsType<T>) => {

  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-table`

  const {
    className,
    ...rest
  } = props

  const tableClassName = getClassNames([
    `${prefixCls}`,
  ])

  return (
    <table
      className={`${tableClassName} ${className}`}
      {...rest}
    >
      <caption>caption</caption>
      <thead>
        <tr>
          <th>theadth</th>
          <th>theadth</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>tbodyth</th>
          <th>tbodyth</th>
          <th>tbodyth</th>
        </tr>
      </tbody>
    </table>
  )
}
export default Table