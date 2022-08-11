import React, { FC, ReactNode, useContext } from "react"
import { GlobalContext } from "../../config/globalContext"
import { getClassNames } from "../../utils/tools"
import { TabsBaseType } from "../Tabs/interface"
import { TabsComtext } from "../TabsComtext"
import { TabPanePropsType } from "./interface"

const TabPane: FC<TabPanePropsType> = (props, ref) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const {
    type,
    activeTab,
    activeTabChange
  } = useContext(TabsComtext);

  const {
    children,
    current,
    num,
    disabled
  } = props

  const isDisabled = typeof disabled === 'function' ? disabled() : disabled

  const checked = activeTab === current

  const prefixCls = `${classNamePrefix}-tabPane`

  const tabPaneClassName = getClassNames([
    `${prefixCls}`,
    `${prefixCls}-${type}-base`,
    checked ? `${prefixCls}-${type}-checked` : '',
    isDisabled ? `${prefixCls}-${type}-disabled` : ''
  ])

  const tabPaneNumClassName = getClassNames([
    `${prefixCls}-line-base-num`,
    checked ? `${prefixCls}-line-checked-num` : '',
    isDisabled ? `${prefixCls}-line-disabled-num` : ''
  ])

  const handleClick: React.MouseEventHandler<HTMLElement> = (event: any): void => {
    !isDisabled && activeTabChange && activeTabChange(current, props)
  };

  return (
    <div
      className={tabPaneClassName}
      onClick={(event) => handleClick(event)}
    >
      {type === 'text' && checked && (
        <div className={`${prefixCls}-${type}-check-left-border`}></div>
      )}
      <span>
        {children}
      </span>
      {type === 'text' && checked && (
        <div className={`${prefixCls}-${type}-check-right-border`}></div>
      )}
      {type === 'line' && (
        <span className={tabPaneNumClassName}>
          {num}
        </span>
      )}
      {type === 'miniCard' && checked && (
        <div className={`${prefixCls}-${type}-check-border`}>
          <div className={`${prefixCls}-${type}-check-border-top-left`}></div>
          <div className={`${prefixCls}-${type}-check-border-top-right`}></div>
          <div className={`${prefixCls}-${type}-check-border-bottom-left`}></div>
          <div className={`${prefixCls}-${type}-check-border-bottom-right`}></div>
        </div>
      )}
    </div>
  )
}

export default TabPane