import React, { FC, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Breadcrumb from "../Breadcrumb"
import Button from "../Button"
import { GlobalContext } from "../config/globalContext"
import Icon from "../Icon"
import { DesignTypes } from "../typings"
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
    pageBody,
    sticky,
    ...rest
  } = {
    ...PageConfig,
    ...props
  }

  const headerPadding: DesignTypes['Padding'] = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    ...pageHeader?.padding
  }

  const bodyPadding: DesignTypes['Padding'] = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    ...pageBody?.padding
  }

  const classNamesObj = {
    page: getClassNames([
      `${prefixCls}`,
      className,
    ]),
    header: getClassNames([
      `${prefixCls}-header`,
      {
        [`${prefixCls}-header-sticky`]: sticky,
        [`${classNamePrefix}-padding-top-lg`]: headerPadding.top,
        [`${classNamePrefix}-padding-right-lg`]: headerPadding.right,
        [`${classNamePrefix}-padding-bottom-lg`]: headerPadding.bottom,
        [`${classNamePrefix}-padding-left-lg`]: headerPadding.left,
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
      {
        [`${classNamePrefix}-padding-top-lg`]: bodyPadding.top,
        [`${classNamePrefix}-padding-right-lg`]: bodyPadding.right,
        [`${classNamePrefix}-padding-bottom-lg`]: bodyPadding.bottom,
        [`${classNamePrefix}-padding-left-lg`]: bodyPadding.left,
      }
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