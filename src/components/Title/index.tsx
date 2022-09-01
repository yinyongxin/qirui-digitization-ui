import React, { FC, useContext, useState } from "react"
import { GlobalContext } from "../config/globalContext"
import { getClassNames, getStyles, getValueIfQualified, isBoolean } from "../utils/tools"
import { TitlePropsType } from "./interface"
import Text from '../Text'

const Title: FC<TitlePropsType> = (props, ref) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-title`

  const {
    type = 'text',
    title,
    tooltip,
    children,
    className,
    style,
    textProps,
    divider = true,
    heading = 1,
    margin: marginProps,
    bodyProps,
    ...rest
  } = props

  const margin = {
    top: true,
    ...marginProps
  }

  const classNamesObj = {
    title: getClassNames([
      `${prefixCls}`,
      {
        [`${prefixCls}-margin-top`]: isBoolean(margin?.top) && margin.top,
        [`${prefixCls}-margin-right`]: isBoolean(margin?.right) && margin.right,
        [`${prefixCls}-margin-bottom`]: isBoolean(margin?.bottom) && margin.bottom,
        [`${prefixCls}-margin-left`]: isBoolean(margin?.left) && margin.left,
      },
      className
    ]),
    body: getClassNames([
      `${prefixCls}-body`,
      bodyProps?.className
    ])
  }


  const tooltipsvg = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.8">
        <path d="M7.2852 9.3008H8.1504C7.9656 8.066 9.6372 7.8476 9.6372 6.5708C9.6372 5.5712 8.9316 5 7.8816 5C7.0836 5 6.4956 5.3612 6 5.8988L6.5544 6.4112C6.9324 5.9996 7.3272 5.7896 7.7808 5.7896C8.3856 5.7896 8.6964 6.1424 8.6964 6.6548C8.6964 7.562 7.0584 7.9148 7.2852 9.3008ZM7.7304 11.4428C8.0832 11.4428 8.352 11.1908 8.352 10.8128C8.352 10.4264 8.0832 10.166 7.7304 10.166C7.3776 10.166 7.1004 10.4264 7.1004 10.8128C7.1004 11.1908 7.3692 11.4428 7.7304 11.4428Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1 0H0V1V4H1V1H4V0H1Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1 16H0V15V12H1V15H4V16H1Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M15 0H16V1V4H15V1H12V0H15Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M15 16H16V15V12H15V15H12V16H15Z" fill="white" />
      </g>
    </svg>
  )

  const bodynRender = () => {
    return children && (
      <div {...bodyProps} className={`${prefixCls}-body`}>
        {children}
      </div>
    )
  }

  const stylesObj = {
    title: getStyles([
      style,
      {
        marginTop: getValueIfQualified(margin.top, !isBoolean(margin?.top)) as any,
        marginBottom: getValueIfQualified(margin.right, !isBoolean(margin?.right)) as any,
        marginRight: getValueIfQualified(margin.bottom, !isBoolean(margin?.bottom)) as any,
        marginLeft: getValueIfQualified(margin.left, !isBoolean(margin?.left)) as any,
      }
    ])
  }

  const dividerRender = () => {
    return divider && (
      <div className={`${prefixCls}-bottom-border`}>
        <div className={`${prefixCls}-bottom-border-left`}></div>
        <div className={`${prefixCls}-bottom-border-center`}></div>
        <div className={`${prefixCls}-bottom-border-right`}></div>
      </div>
    )
  }

  return (
    <div {...rest} style={stylesObj.title} className={classNamesObj.title}>
      <div className={`${prefixCls}-main`}>
        <Text level={heading} type='primary' {...textProps}>{title}</Text>
        {tooltip === 'tooltip' && (
          <div className={`${prefixCls}-tooltip`}>
            {tooltipsvg}
          </div>
        )}
      </div>
      {dividerRender()}
      {bodynRender()}
    </div>
  )
}
export default Title