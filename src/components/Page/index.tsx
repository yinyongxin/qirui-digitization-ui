import { title } from "process"
import React, { FC, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Breadcrumb from "../Breadcrumb"
import Button from "../Button"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { getClassNames, getStyles } from "../utils/tools"
import { PagePropsType } from "./interface"

const Page = (props: PagePropsType) => {
  const navigate = useNavigate();


  const {
    classNamePrefix,
    PageConfig
  } = useContext(GlobalContext);
  const prefixCls = `${classNamePrefix}-page`

  const {
    style,
    className,
    children,
    pageHeader,
    sticky,
    ...rest
  } = {
    ...PageConfig,
    ...props
  }

  const classNamesObj = {
    page: getClassNames([
      `${prefixCls}`,
      className,
    ]),
    header: getClassNames([
      `${prefixCls}-header`,
      {
        [`${prefixCls}-header-sticky`]: sticky
      }
    ]),
    toBack: getClassNames([
      `${prefixCls}-toBack`,
    ]),
    title: getClassNames([
      `${prefixCls}-title`,
    ]),
    descriptions: getClassNames([
      `${prefixCls}-descriptions`,
    ]),
    main: getClassNames([
      `${prefixCls}-main`,
    ]),
  }

  const stylesObj = {
    page: getStyles([
      style
    ])
  }

  const getToBack = () => {
    return pageHeader?.toBack && (
      <div>
        <Button
          buttonShowType='text'
          onClick={() => {
            navigate(-1)
          }}
        >
          <div className={classNamesObj.toBack}>
            <Icon icon="angle-left" size={14} />
            <span>
              返回
            </span>
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div
      className={classNamesObj.page}
      style={stylesObj.page}
      {...rest}
    >
      <header style={pageHeader?.style} className={classNamesObj.header}>
        {getToBack()}
        {pageHeader?.breadcrumb && (
          <Breadcrumb {...pageHeader.breadcrumb} />
        )}
        {pageHeader?.title && (
          <div className={classNamesObj.title}>
            {pageHeader?.title}
          </div>
        )}
        {pageHeader?.descriptions && (
          <div className={classNamesObj.descriptions}>
            {pageHeader?.descriptions}
          </div>
        )}
      </header>
      <main className={classNamesObj.main}>
        {children && children}
      </main>
    </div>
  )
}
export default Page