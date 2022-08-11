import React, { ForwardRefRenderFunction, useContext, useEffect, useImperativeHandle, useMemo, useState } from "react"
import omit from "../../utils/tools/omit"
import { GlobalContext } from "../../config/globalContext"
import { getClassNames } from "../../utils/tools"
import TabPane from "../TabPane"
import { TabsComtext } from "../TabsComtext"
import { ActiveTabChangeType, TabsHandle, TabsPropsType } from "./interface"
import { TabPaneBaseType } from "../TabPane/interface"

const Tabs: ForwardRefRenderFunction<unknown, TabsPropsType> = (props, ref) => {
  const {
    classNamePrefix
  } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-tabs`
  const {
    activeTab: propsActiveTab,
    type = 'line',
    tabList = [],
    activeTabChange: propsactiveTabChange
  } = props

  const [activeTab, setActiveTab] = useState<TabPaneBaseType['current']>()

  const activeTabChange: ActiveTabChangeType = (activeTabKey, tabPaneProps) => {
    console.log('activeTabKey, tabPaneProps', activeTabKey, tabPaneProps);

    setActiveTab(activeTabKey)
    propsactiveTabChange && propsactiveTabChange(activeTabKey, tabPaneProps)
  }

  useEffect(() => {
    setActiveTab(propsActiveTab || tabList?.[0].current)
  }, [])

  const tabPanes = useMemo(() => tabList.map(tab => {
    const tabPanesProps = omit(tab, ['content'])
    const tabPaneChilren = typeof tab.title === 'function' ? tab.title() : tab.title
    return (
      <TabPane
        key={tab.current}
        {...tabPanesProps}
      >{tabPaneChilren}</TabPane>
    )
  }), [tabList, activeTab])

  const tabContent = useMemo(() => {
    const content = tabList.find(tab => tab.current === activeTab)?.content
    return typeof content === 'function' ? content() : content
  }, [tabList, activeTab])

  const tabsClassName = getClassNames([
    `${prefixCls}`,
  ])

  const tabPanesContainerClassName = getClassNames([
    `${prefixCls}-tabPanesContainer`,
    `${prefixCls}-tabPanesContainer-${type}`,
  ])

  const tabContentContainerClassName = getClassNames([
    `${prefixCls}-tabContentContainer`,
  ])

  useImperativeHandle<unknown, TabsHandle>(
    ref,
    () => ({
      activeTab
    }),
    [activeTab]
  )

  return (
    <TabsComtext.Provider
      value={{
        type,
        activeTab,
        activeTabChange
      }}
    >
      <div className={tabsClassName}>
        <div className={tabPanesContainerClassName}>
          {tabPanes}
        </div>
        {tabContent && (
          <div className={tabContentContainerClassName}>
            {tabContent}
          </div>
        )}
      </div>
    </TabsComtext.Provider>
  )
}


export default React.forwardRef(Tabs);