import React, { FC, useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { GlobalContext } from "../config/globalContext"
import { ClassNameType, getClassNames, getStyles } from "../utils/tools"
import { BreadcrumbPropsType } from "./interface"

// 面包屑
const Breadcrumb = (props: BreadcrumbPropsType) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-breadcrumb`

  const location = useLocation()
  const navigate = useNavigate();
  const {
    style,
    className,
    children,
    separator = '/',
    list,
    ...rest
  } = props

  const classNamesObj = {
    breadcrumb: getClassNames([
      `${prefixCls}`,
      className,
    ]),
    breadcrumbItem: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-breadcrumbItem`,
      ...classNames
    ]),
    separator: (classNames: ClassNameType[] = []) => getClassNames([
      `${prefixCls}-separator`,
      ...classNames
    ]),
  }

  const getList = () => {
    return list.map((item, index) => {
      return (
        <div
          key={`separator${index}`}
        >
          {index !== 0 && (
            <span className={classNamesObj.separator()}>
              {separator}
            </span>
          )}
          <span
            className={classNamesObj.breadcrumbItem([
              {
                [`${prefixCls}-isThis`]: item?.path === location.pathname
              }
            ])}
            onClick={() => {
              item?.path && navigate(item.path)
            }}
          >
            {item.title}
          </span>
        </div>
      )
    })
  }

  const stylesObj = {
    breadcrumb: getStyles([
      style
    ])
  }

  return (
    <div
      className={classNamesObj.breadcrumb}
      style={stylesObj.breadcrumb}
      {...rest}
    >
      {getList()}
      {children}
    </div>
  )
}
export default Breadcrumb